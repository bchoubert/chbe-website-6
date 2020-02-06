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
    experience: (exp, i) => `<li class="more" onclick="UTILS.move('experience', ${i + 1})">
        <h4>${exp.title}</h4>
        ${exp.company}
        <i class="more-icon fas fa-plus"></i>
    </li>`,
    education: (edu, i, arr) => `<li class="more ${i === arr.length - 1 ? 'no-link' : ''}" onclick="UTILS.move('education', ${i + 1})">
        <h4>${edu.title}</h4>
        ${edu.school} <i class="dot"></i> ${edu.dates.yEnd}
        <i class="more-icon fas fa-plus"></i>
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
        <a href="${net.link}" title="${net.name}" target="_blank">
            <i class="${net.icon}"></i>
        </a>
    </li>`,
    navNetwork: net => `<a class="nav-action nav-action-reverse xl-only" href="${net.link}" target="_blank" style="background-color: ${net.color}" title="${net.name}">
        <i class="${net.icon}"></i>
    </a>`,
    service: s => `<li class="no-link with-icon">
        <i class="li-icon fas ${s.icon} fa-fw"></i>
        <span>${s.title}</span>
    </li>`,
    skill: s => `<li class="no-link with-icon">
        <i class="li-icon fas ${s.icon} fa-fw"></i>
        <h4>${s.title}</h4>
        ${!!s.technologies ? s.technologies.map(t => `${t.title}`).join(', ') : ''}
        ${!!s.technologies && !!s.list ? '<br/>' : ''}
        ${!!s.list ? `${s.list.join(', ')}` : ''}
    </li>`,
    shot: s => `<li class="li-shot">
        <a href="${s.html_url}" target="_blank">
            <img src="${s.images.normal}" alt="${s.title}" title="${s.title}" />
        </a>
    </li>`,
    project: (p, i) => `<li class="no-link with-icon more" onclick="UTILS.move('projects', ${i + 1})">
        <i class="li-icon ${p.icon}"></i>
        <h4>${p.title}</h4>
        ${p.description}
        <i class="more-icon fas fa-plus"></i>
    </li>`
};

const DETAILS_TEMPLATES = {
    experience: exp => `
        <div class="slide">
            <div class="slide-row">
                <span class="back-link" onclick="UTILS.move('experience', 0)">
                    <i class="fas fa-arrow-circle-left"></i>
                    Back
                </span>
                <div class="slide-content">
                    <h2 style="color: ${exp.color}">
                        <i class="${exp.icon}"></i>
                        ${exp.title}
                    </h2>
                    <span>
                        <i class="fas fa-building"></i>
                        ${exp.company}
                    </span>
                    <span>
                        <i class="fas fa-map-marker"></i>
                        ${exp.location}
                    </span>
                    <span>
                        <i class="fas fa-calendar"></i>
                        ${exp.dates.start} - ${exp.dates.end}
                    </span>
                    <span>
                        <i class="fas fa-signature"></i>
                        ${exp.contract}
                    </span>
                    <span>
                        <h4>
                            <i class="fas fa-cogs"></i>
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
                <div class="slide-side">
                    <h4>
                        <i class="fas fa-cube"></i>
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
                        <i class="fas fa-check"></i>
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
        </div>`,
    education: edu => `
        <div class="slide">
            <div class="slide-row">
                <span class="back-link" onclick="UTILS.move('education', 0)">
                    <i class="fas fa-arrow-circle-left"></i>
                    Back
                </span>
                <div class="slide-content">
                    <h2 style="color: ${edu.color}">
                        <i class="${edu.icon}"></i>
                        ${edu.title}
                    </h2>
                    <span>
                        <i class="fas fa-building"></i>
                        ${edu.school}
                    </span>
                    <span>
                        <i class="fas fa-map-marker"></i>
                        ${edu.location}
                    </span>
                    <span>
                        <i class="fas fa-calendar"></i>
                        ${edu.dates.start} - ${edu.dates.end}
                    </span>
                </div>
                <div class="slide-side">
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
        </div>
    `,
    project: p => `
        <div class="slide">
            <div class="slide-row">
                <span class="back-link" onclick="UTILS.move('projects', 0)">
                    <i class="fas fa-arrow-circle-left"></i>
                    Back
                </span>
                <div class="slide-content">
                    <h2 style="color: ${p.color}">
                        <i class="${p.icon}"></i>
                        ${p.title}
                    </h2>
                    <span>${p.description}</span>
                    <span class="link-group">
                        ${!!p.website ? `<a href="${p.website}" target="_blank" aria-label="live website" style="background-color: ${p.color}">
                            <i class="fas fa-globe"></i>
                            Live
                        </a>` : ''}
                        ${p.links.map(l => `<a href="${l.link}" target="_blank" aria-label="${l.title}" style="background-color: ${p.color}">
                            <i class="${l.icon}"></i>
                            ${l.title}
                        </a>`).join('')}
                    </span>
                    <h4>
                        <i class="fas fa-cogs"></i>
                        Technologies 
                        <span class="decoration" style="background-color: ${p.color}"></span>
                    </h4>
                    <ul>
                        ${p.technologies.map(t => `<li>
                            <i class="${t.icon}"></i>
                            ${t.title}
                        </li>`).join('')}
                    </ul>
                </div>
                <a href="${BASE_URL + p.images[0]}" target="_blank" class="slide-side" style="background-image: url('${BASE_URL + p.images[0]}')"></a>
            </div>
        </div>
    `
};

const initFullPage = () => new fullpage('#fullpage', {
    licenseKey: KEYS.FULLPAGE,
    autoScrolling: true,
    sectionSelector: 'section',
    normalScrollElements: 'nav, #popin',
    scrollOverflow: true,
    paddingTop: '3.5em',
    loopHorizontal: false,
    controlArrows: false,
	paddingBottom: '1.5rem',
    afterLoad: function(_, dest) {
        if (dest.index === 0) {
            document.querySelector('nav').classList.remove('nav--deployed');
        } else {
            document.querySelector('nav').classList.add('nav--deployed');
        }
    }
});

const initSections = () => {
    document.querySelector('#experience-list').innerHTML = data.experience.map(TEMPLATES.experience).join('');
    document.querySelector('#networks').innerHTML = data.networks.map(TEMPLATES.network).join(`<i class="dot"></i>`);
    document.querySelector('#services-list').innerHTML = data.services.map(TEMPLATES.service).join('');
    document.querySelector('#skills-list').innerHTML = data.skills.map(TEMPLATES.skill).join('');
    document.querySelector('#projects-list').innerHTML = data.projects.map(TEMPLATES.project).join('');
    document.querySelector('#education-list').innerHTML = data.education.map(TEMPLATES.education).join('') + data.certifications.map(TEMPLATES.certificaton).join('');

    document.querySelector('#nav-contact-link').insertAdjacentHTML('beforebegin', data.networks.map(TEMPLATES.navNetwork).join(''));

    document.querySelector('[data-anchor=projects]').insertAdjacentHTML('beforeend', data.projects.map(DETAILS_TEMPLATES.project).join(''));
    document.querySelector('[data-anchor=experience]').insertAdjacentHTML('beforeend', data.experience.map(DETAILS_TEMPLATES.experience).join(''));
    document.querySelector('[data-anchor=education]').insertAdjacentHTML('beforeend', data.education.map(DETAILS_TEMPLATES.education).join(''));
};

const getDribbbleShots = () => {
    fetch(`https://api.dribbble.com/v2/user/shots?access_token=${KEYS.DRIBBBLE_ACCESS_TOKEN}`)
        .then(res => {
            if(!!res.ok) {
                return Promise.resolve(res);
            }
            throw Error('HTTP Error');
        })
        .then(data => data.json())
        .then(json => {
            document.querySelector('#shots-list').innerHTML = json.map(TEMPLATES.shot).join('');
            fullpage_api.reBuild();
        })
        .catch(err => {
            document.querySelector('#shots-list').innerHTML = `<li>A problem occured while fetching shots</li>`;
            console.error(err);
        });
};

(function () {
    initSections();
    initFullPage();
    getDribbbleShots();

    UTILS['move'] = fullpage_api.moveTo;
    
})();
