'use strict';

const BASE_URL = '';
const EMAIL_URL = BASE_URL + '/resources/php/send.php';

let POPUP = null;
let POPUP_CONTENT = null;

let DRIBBBLE_SHOTS = null;

const UTILS = {
    sendEmail: () => {

        let params = {
            name: document.querySelector('#name').value,
            email: document.querySelector('#email').value,
            message: document.querySelector('#message').value
        };

        fetch(EMAIL_URL)
            .then(res => {
                if(!res.ok) {
                    throw Error('Can\'t get token...');
                }
                return Promise.resolve(res);
            })
            .then(data => data.text())
            .then(token => {
                params['check'] = token;

                fetch(EMAIL_URL, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    redirect: 'follow',
                    body: Object.entries(params).map(([key, value]) => `${key}=${value}`).join('&')
                })
                    .then(res => {
                        if(!res.ok) {
                            throw Error('Error send email');
                        }
                        return Promise.resolve(res);
                    })
                    .then(_ => {
                        document.querySelector('.form-result').innerHTML = 'Message sent!';
                        document.querySelector('.form-result').classList.remove('form-result--error');
                        document.querySelector('.form-result').classList.add('form-result--success');
                    })
                    .catch(err => {
                        console.error('Error sending email: ' + err);
                        document.querySelector('.form-result').innerHTML = 'An error occured. Please retry or contact me directly via LinkedIn or email';
                        document.querySelector('.form-result').classList.remove('form-result--success');
                        document.querySelector('.form-result').classList.add('form-result--error');
                    });
            })
            .catch(err => console.error('Error sending email: ' + err));
    },
    triggerMorePopup: () => {
        POPUP_CONTENT.innerHTML = TEMPLATES.more(data.education, data.certifications, data.experience, data.skills);
        POPUP.classList.add('popup--deployed');
        POPUP_CONTENT.scrollTop = 0;
    },
    triggerProjectPopup: projectKey => {
        const project = data.projects.filter(p => p.key === projectKey)[0];
        if(!project) { console.error(`Can't find the project ${projectKey}`); }
        POPUP_CONTENT.innerHTML = TEMPLATES.projectDetails(project);
        POPUP.classList.add('popup--deployed');
        POPUP_CONTENT.scrollTop = 0;
    },
    fetchDribbbleShots: () => {
        return new Promise((resolve, reject) => {
            if(!!DRIBBBLE_SHOTS) {
                resolve(DRIBBBLE_SHOTS);
                return;
            }
            fetch(`https://api.dribbble.com/v2/user/shots?access_token=${KEYS.DRIBBBLE_ACCESS_TOKEN}&per_page=1000`)
                .then(res => {
                    if(!!res.ok) {
                        return Promise.resolve(res);
                    }
                    throw Error('HTTP Error');
                })
                .then(data => data.json())
                .then(json => {
                    DRIBBBLE_SHOTS = json;
                    resolve(json);
                })
                .catch(err => {
                    console.error(err);
                    reject(err);
                });
        });        
    },
    printDribbbleShotsForProjectId: projectId => {
        UTILS.fetchDribbbleShots().then(shots => {
            let dribbbleContainer = document.querySelector('.Project-dribbble-images');
            if(!!dribbbleContainer) {
                dribbbleContainer.innerHTML = shots.filter(s => s.projects.map(p => p.id).includes(projectId)).map(s => `
                    <img class="w-100 my" style="border-radius: 4px; background-color: white" src="${s.images.hidpi}" />
                `).join('');
            }
        });
    }
};

const TEMPLATES = {
    navNetwork: net => `<a href="${net.link}" target="_blank" title="${net.name}" rel="noopener noreferrer">
        <i class="${net.icon}"></i>
        <span class="sr-only">${net.name}</span>
    </a>`,
    project2: p => `
        <div class="Project2" onclick="UTILS.triggerProjectPopup('${p.key}')">
            <img src="${p.mobile}" />
            <div class="Project2-overlay">
                <div class="Project2-view">
                    <h3 class="text-shadow" style="color: ${p.color};">
                        <i class="${p.icon}"></i> ${p.title}
                    </h3>
                    ${!!p.wip ? `<span class="wip-indicator" style="background-color: ${p.color}"><span>WIP</span></span>` : ''}
                </div>
                <div class="Project2-view">
                    <span class="w-100" style="color: white; background-color: ${p.color}; border-top: 1px solid white; border-bottom: 1px solid white">
                        View details
                    </span>
                </div>
            </div>
        </div>
    `,
    projectDetails: p => {
        UTILS.printDribbbleShotsForProjectId(p.dribbbleProject);
        return `<div class="content Project-header my">
            <span class="center-content py px" style="background-color: ${p.color}; color: white">
                <h2>
                    <i class="${p.icon}"></i>
                    ${p.title}
                </h2>
            </span>
            <div class="flex-container my">
                <div class="fl1 mx">
                    <img class="Project-header-image" src="${p.mobile}" style="border: 1px solid ${p.color}" />
                </div>
                <div class="fl1 mx">
                    <h3 style="color: ${p.color}; text-align: left" class="my">Description</h3>
                    <div class="content">${p.description}</div>
                    <h3 style="color: ${p.color}; text-align: left" class="my">Tags</h3>
                    <div class="content">
                        ${p.tags.map(t => `<div class="Project-tag" style="border-color: ${p.color}">${t}</div>`).join('')}
                    </div>
                    <h3 style="color: ${p.color}; text-align: left" class="my">Main Technologies</h3>
                    <div class="content">
                        ${p.technologies.map(t => `<div class="Project-tech" style="border-color: ${p.color}"><i class="${t.icon}"></i> ${t.title}</div>`).join('')}
                    </div>
                    <h3 style="color: ${p.color}; text-align: left" class="my">Links</h3>
                    ${p.links.map(l => `<a href="${l.link}" target="_blank" rel="noopener noreferrer" class="Project-link" style="background-color: ${p.color}">
                        <span><i class="${l.icon}"></i></span>
                        <span>${l.title}</span>
                    </a>`).join('')}
                </div>
            </div>
        </div>
        ${p.details.map(d => `<div class="Project-detail">
            <h3 style="flex: 0 0 20%; white-space: pre-wrap; word-break: break-word; color: ${p.color}; text-align: left">${d.title}</h3>
            <div style="flex: 1">${d.content}</div>
        </div>`).join('')}
        <div class="py Project-dribbble center-content" style="background-image: linear-gradient(to bottom right, ${p.color}, ${p.lighten})">
            <h3 style="color: white"><i class="icon icon-dribbble"></i> Dribbble Project</h3>
            <div class="mx Project-dribbble-images"></div>
        </div>`
    },
    expertise: e => `<li>
        <h3><i class="icon ${e.icon}"></i> ${e.title}</h3>
        <span>${e.description}</span>
    </li>`,
    more: (education, certifications, experience, skills) => `<div class="content">
        <h2>Education</h2>
        ${education.map(e => `<div class="indicator-parent my">
            <span class="indicator" style="background-color: ${e.color}; color: white"><i class="${e.icon}"></i></span>
            <span>
                ${e.title} <span class="sub">/ ${e.school} / ${e.dates.yEnd}<br/>
                    ${e.description}
                        ${e.details.skills.map(d => `<span class="d-block my">${d.title}: 
                            ${d.list.join(', ')}
                        </span>`).join('')}
                    </span>                
            </span>
        </div>`).join('')}
        <h2>Certifications</h2>
        <div class="flex-wrap-container">
            ${certifications.map(c => `<div class="indicator-parent my flb50">
                <span class="indicator" style="background-color: ${c.color}; color: white"><i class="${c.icon}"></i></span>
                <span>${c.organism}<br/>${!!c.title ? c.title : ''}</span>
            </div>`).join('')}
        </div>
        <h2>Skills</h2>
        ${skills.map(s => `
            <div class="indicator-parent my">
                <span class="indicator ${!!s.expertise ? 'indicator-big' : ''}" style="background-color: ${s.color}; color: white">
                    <i class="${s.icon}" ${!!s.expertise ? `style="font-size: 2rem"` : ''}></i>
                </span>
                <span><h3 style="text-align: left">${s.title}</h3>
                    ${!!s.expertise ? s.description : ''}
                    ${!!s.list ? `<span class="sub d-block mb">
                        ${s.list.join(', ')}
                    </span>` : ''}
                    ${!!s.technologies ? `<span class="sub d-block mb">
                        ${s.technologies.map(t => `<span>
                            ${!!t.icon ? `<i class="${t.icon}"></i>` : ''}
                            ${t.title}
                        </span>`).join(', ')}
                    </span>` : ''}
                </span>
            </div>
        `).join('')}
        <h2>Experience</h2>
        ${experience.map(e => `<div class="indicator-parent my">
            <span class="indicator indicator-big" style="background-color: ${e.color}; color: white">
                <i class="${e.icon}" style="font-size: 2.5rem"></i>
            </span>
            <span><h3 style="display: inline">${e.title}</h3> @ ${e.company}<br/>
                <span class="sub d-block">
                    ${e.location} - ${e.contract} / ${e.dates.start} > ${e.dates.end}
                </span>
                <h3 style="text-align: left">Projects</h3>
                ${e.projects.map(p => `<div class="indicator-parent my">
                    <span class="indicator" style="background-color: ${e.color}; color: white"><i class="${p.icon}"></i></span>
                    <span>${p.name}<span class="ssub d-block">${p.description}</span></span>
                </div>`).join('')}
                <h3 style="text-align: left">Tasks</h3>
                <ul>
                    ${e.tasks.map(t => `<li>${t}</li>`).join('')}
                </ul>
                <h3 style="text-align: left">Technologies</h3>
                ${e.mainTechnologies.map(t => `<span class="indicator my" title="${t.title}" style="background-color: ${e.color}; color: white">
                    <i class="${t.icon}"></i></span>`).join('')}
                ${e.otherTechnologies.map(t => `<span class="indicator my" title="${t.title}" style="color: ${e.color}">
                    <i class="${t.icon}"></i></span>`).join('')}
            </span>
        </div>`).join('')}
    </div>`
};


const transformData = () => {
    console.log(`
${data.experience.map(exp => `${exp.title}\n${exp.company}\n${exp.dates.start} - ${exp.dates.end}\n${exp.location}\n${exp.contract}
Technologies: ${exp.mainTechnologies.map(tech => tech.title).join(', ')}, ${exp.otherTechnologies.map(tech => tech.title).join(', ')}
Projects:\n${exp.projects.map(proj => `${proj.name}: ${proj.description}`).join('\n')}
Tasks:\n${exp.tasks.map(task => `- ${task}`).join('\n')}`).join('\n\n')}
${data.projects.map(proj => `${proj.title}\n${proj.description}
Technologies: ${proj.technologies.map(tech => tech.title).join(', ')}`).join('\n\n')}
${data.education.map(edu => `${edu.title}\n${edu.school}\n${edu.dates.yEnd}
${edu.details.skills.map(skL => `${skL.title}: ${skL.list.join(', ')}`).join('\n')}`).join('\n\n')}`);
};

const initSections = () => {
    document.querySelector('#nav-contact-link').insertAdjacentHTML('beforebegin', data.networks.map(TEMPLATES.navNetwork).join(''));
    document.querySelector('.Section-projects .content').innerHTML = data.projects.map(TEMPLATES.project2).join('');
    document.querySelector('#expertise-list').innerHTML = data.skills.filter(s => !!s.expertise).map(TEMPLATES.expertise).join('');
};

const registerSW = () => {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => 
            navigator.serviceWorker.register(BASE_URL + '/service-worker.js')
                .catch(console.error)
        );
    }
      
};

(() => {
    // POPUP events
    POPUP_CONTENT = document.querySelector('.popup-content');
    POPUP = document.querySelector('.popup');
    document.querySelector('.popup-close').addEventListener('click', () => POPUP.classList.remove('popup--deployed'));

    initSections();

    document.querySelectorAll('.scene').forEach(scene => new Parallax(scene));

    //registerSW(); 
})();
