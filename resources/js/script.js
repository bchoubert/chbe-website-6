'use strict';

const BASE_URL = '';

const EMAIL_URL = BASE_URL + '/resources/php/send.php';

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
                    .then(data => {
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
    }
};

const TEMPLATES = {
    experience: exp => `
        <li>
            <div>
                <div>
                    <h2 style="color: ${exp.color}">
                        <i class="${exp.icon}"></i>
                        ${exp.title}
                    </h2>
                    <span>
                        <i class="icon icon-building"></i>
                        ${exp.company}
                    </span>
                    <span>
                        <i class="icon icon-map-marker"></i>
                        ${exp.location}
                    </span>
                    <span>
                        <i class="icon icon-calendar"></i>
                        ${exp.dates.start} - ${exp.dates.end}
                    </span>
                    <span>
                        <i class="icon icon-signature"></i>
                        ${exp.contract}
                    </span>
                    <span>
                        <h4>
                            <i class="icon icon-cogs"></i>
                            Technologies
                            <span class="decoration" style="background-color: ${exp.color}"></span>
                        </h4>
                        <ul>
                            ${exp.mainTechnologies.map(tech => `<li>
                                <i class="${tech.icon}"></i>
                                ${tech.title}
                            </li>`).join('')}

                            ${exp.otherTechnologies.map(tech => `<li class="other">
                                <i class="${tech.icon}"></i>
                                ${tech.title}
                            </li>`).join('')}
                        </ul>
                    </span>
                </div>
                <div>
                    <h4>
                        <i class="icon icon-cube"></i>
                        Projects
                        <span class="decoration" style="background-color: ${exp.color}"></span>
                    </h4>
                    <ul class="datalist--vertical">
                        ${exp.projects.map(proj => `
                        <li class="with-icon no-link">
                            <i class="li-icon ${proj.icon}"></i>
                            <h4>${proj.name}</h4><br/>
                            ${proj.description}
                        </li>`).join('')}
                    </ul>
                    <h4>
                        <i class="icon icon-check"></i>
                        Tasks
                        <span class="decoration" style="background-color: ${exp.color}"></span>
                    </h4>
                    <ul class="datalist--vertical">
                        ${exp.tasks.map(task => `<li class="no-link">
                            ${task}
                        </li>`).join('')}
                    </ul>
                </div>
            </div>
        </li>`,
    education: edu => `
        <li>
            <div>
                <div>
                    <h2 style="color: ${edu.color}">
                        <i class="${edu.icon}"></i>
                        ${edu.title}
                    </h2>
                    <span>
                        <i class="icon icon-building"></i>
                        ${edu.school}
                    </span>
                    <span>
                        <i class="icon icon-map-marker"></i>
                        ${edu.location}
                    </span>
                    <span>
                        <i class="icon icon-calendar"></i>
                        ${edu.dates.start} - ${edu.dates.end}
                    </span>
                </div>
                <div>
                    ${(!!edu.details && !!edu.details.skills) ?
                        edu.details.skills.map(sk => `
                            <h4>
                                ${sk.title}
                                <span class="decoration" style="background-color: ${edu.color}"></span>
                            </h4>
                            <ul>${sk.list.map(sku => `<li>${sku}</li>`).join('')}</ul>
                        `).join('') : '' }
                </div>
            </div>
        </li>`,
    certificaton: cert => `<li>
        ${!!cert.title ? `
            <h4>${cert.title}</h4>
            ${cert.organism}
        ` : `
            <h4>${cert.organism}</h4>
        `}
    </li>`,
    network: net => `<li>
        <a href="${net.link}" title="${net.name}" target="_blank" rel="noopener noreferrer">
            <i class="${net.icon}"></i>
            <span class="sr-only">${net.name}</span>
        </a>
    </li>`,
    navNetwork: net => `<a class="nav-action" href="${net.link}" target="_blank" title="${net.name}" rel="noopener noreferrer">
        <i class="${net.icon}"></i>
        <span class="sr-only">${net.name}</span>
    </a>`,
    service: s => `<li class="no-link with-icon">
        <i class="li-icon fas ${s.icon}"></i>
        <span>${s.title}</span>
    </li>`,
    skill: s => `<li class="no-link with-icon">
        <i class="li-icon fas ${s.icon}"></i>
        <h4>${s.title}</h4>
        ${!!s.technologies ? s.technologies.map(t => `${t.title}`).join(', ') : ''}
        ${!!s.technologies && !!s.list ? '<br/>' : ''}
        ${!!s.list ? `${s.list.join(', ')}` : ''}
    </li>`,
    shot: s => `<li class="li-shot card">
        <a class="card-part-description" href="${s.html_url}" target="_blank" rel="noopener noreferrer">
            <img src="${s.images.normal}" alt="${s.title}" title="${s.title}" />
        </a>
        <div class="card-part-square">
            <span>${s.title}</span>
        </div>
    </li>`,
    project: p => `
        <li class="card">
            <div class="card-content">
                    <span class="icon-container" style="background-color: ${p.color}">
                        <i class="${p.icon}"></i>
                    </span>
                    <h2 style="color: ${p.color}">
                        ${p.title}
                    </h2>
                    <span>${p.description}</span>
            </div>
        </li>`
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
    document.querySelector('#experience-list').innerHTML = data.experience.map(TEMPLATES.experience).join('');
    document.querySelector('#services-list').innerHTML = data.services.map(TEMPLATES.service).join('');
    document.querySelector('#skills-list').innerHTML = data.skills.map(TEMPLATES.skill).join('');
    document.querySelector('#projects-list').innerHTML = data.projects.map(TEMPLATES.project).join('');
    document.querySelector('#education-list').innerHTML = data.education.map(TEMPLATES.education).join('') + data.certifications.map(TEMPLATES.certificaton).join('');

    document.querySelector('#nav-resume-link').insertAdjacentHTML('beforebegin', data.networks.map(TEMPLATES.navNetwork).join(''));
};

const getDribbbleShots = () => {
    fetch(`https://api.dribbble.com/v2/user/shots?access_token=${KEYS.DRIBBBLE_ACCESS_TOKEN}&page=1&per_page=99`)
        .then(res => {
            if(!!res.ok) {
                return Promise.resolve(res);
            }
            throw Error('HTTP Error');
        })
        .then(data => data.json())
        .then(json => {
            document.querySelector('#shots-list').innerHTML = json.map(TEMPLATES.shot).join('');
        })
        .catch(err => {
            document.querySelector('#shots-list').innerHTML = `<li>A problem occured while fetching shots</li>`;
            console.error(err);
        });
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
    initSections();
    // Defer Dribbble API call
    setTimeout(getDribbbleShots);  
})();
