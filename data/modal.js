
// Loads a modal from an experience card in the experience-modals
function openModal(card) {

  // Retrieves the experience card's data-id
  const id = card.dataset.id;
  
  // Access its informations in the experience-modals.js experience data
  const data = experienceData[id];
  
  // If data is not found, return nothing
  if (!data) return;

  // Creates a text content for the following:
  //    Title, Date, Location, Summary
  document.querySelector('.exp-modal-title').textContent = data.title;
  document.querySelector('.exp-modal-location').textContent = data.location ? '📍 ' + data.location : '';
  document.querySelector('.exp-modal-summary').textContent = data.summary;

  // Dates: Maps each element as <span class="exp-modal-date"></span> in html
  const dates = Array.isArray(data.date) ? data.date : [data.date];
  document.querySelector('.exp-modal-dates').innerHTML =
    dates.filter(Boolean).map(d => `<span class="exp-modal-date">📅 ${d}</span>`).join('');

  // Bulletpoints: Maps each element as <li></li> in html
  document.querySelector('.exp-modal-bullets').innerHTML =
    data.bullets.map(b => `<li>${b}</li>`).join('');

  // Skills: Maps each element as <span class="skill-pill"></span> in html
  const skillLabel = document.querySelector('.exp-modal-skills-label');
  const skillPills = document.querySelector('.exp-modal-pills');
  skillPills.innerHTML = data.skills.map(s => `<span class="skill-pill">${s}</span>`).join('');
  skillPills.style.display = (data.skills && data.skills.length) ? 'flex' : 'none';
  skillLabel.style.display = (data.skills && data.skills.length) ? 'block' : 'none';

  // Badges: Maps each element as <span class="exp-modal-badge"></span> in html
  const badges = Array.isArray(data.badge) ? data.badge : [data.badge];
  document.querySelector('.exp-modal-badges').innerHTML =
    badges.map(b => `<span class="exp-modal-badge">${b}</span>`).join('');


  // Highlights: Renders notable events as pills
  const highlightsBox = document.querySelector('.exp-modal-highlights');
  const highlightsLabel = document.querySelector('.exp-modal-highlights-label');
  highlightsBox.innerHTML = (data.highlights || []).map(h => `<span class="skill-pill">${h}</span>`).join('');
  highlightsBox.style.display = (data.highlights && data.highlights.length) ? 'flex' : 'none';
  highlightsLabel.style.display = (data.highlights && data.highlights.length) ? 'block' : 'none';

  // Certificates: Maps each elemest as <a href="${c.url}" target="_blank" class="exp-modal-certificate"></a> in html
  const certificationBox = document.querySelector('.exp-modal-certificates');
  const certificationLabel = document.querySelector('.exp-modal-certifications-label');
  certificationBox.innerHTML = (data.certifications || []).map(c => `
    <a href="${c.url}" target="_blank" class="exp-modal-certificate">
      ${c.name}
    </a>`).join('');
  certificationBox.style.display = (data.certifications && data.certifications.length) ? 'flex' : 'none';
  certificationLabel.style.display = (data.certifications && data.certifications.length) ? 'block' : 'none';

  // Avatars: Maps each elemest as <img src="${a}" alt="" class="exp-modal-avatar-img"></img> in html
  const avatarsBox = document.querySelector('.exp-modal-avatars');
  avatarsBox.innerHTML = (data.avatars || []).map(a =>
  `<img src="${a}" alt="" class="exp-modal-avatar-img">`
  ).join('');
  avatarsBox.style.display = (data.avatars && data.avatars.length) ? 'flex' : 'none';

  // Photos: Maps each elemest as <img src="${p}" alt="" class="exp-modal-photo-img"></img> in html
  const photosBox = document.querySelector('.exp-modal-photos');
  photosBox.innerHTML = data.photos.map(p => `<img src="${p}" alt="" class="exp-modal-photo-img">`).join('');
  photosBox.style.display = data.photos.length ? 'grid' : 'none';

  // PDFs: Maps each elemest as <div class="exp-modal-pdf-box"></div> in html
  const pdfsBox = document.querySelector('.exp-modal-pdfs');
  pdfsBox.innerHTML = data.pdfs.map(p => `
    <div class="exp-modal-pdf-box">
      <embed src="${p}" class="exp-modal-pdf">
    </div>`).join('');
  pdfsBox.style.display = data.pdfs.length ? 'block' : 'none';

  // Videos: Maps each elemest in html <div class="exp-modal-video-box"></div> in html
  const videosBox = document.querySelector('.exp-modal-videos');
  videosBox.innerHTML = data.videos.map(v => `
    <div class="exp-modal-video-box">
      <iframe src="${v}" class="exp-modal-video" frameborder="0" allowfullscreen></iframe>
    </div>`).join('');
  videosBox.style.display = data.videos.length ? 'block' : 'none';

  // Demo Buttons: Adds a demo button and link reference
  const demoLink = document.querySelector('.exp-modal-demo');
  demoLink.href = data.demo;
  demoLink.style.display = data.demo ? 'inline-flex' : 'none';

  // Creates an instance of expModal and makes it active so it displays
  // .exp-modal-overlay.active in styles.css
  document.getElementById('expModal').classList.add('active');
}

// Calls the openModal() function for each experience card clicked
document.querySelectorAll('.experience-card').forEach(card => {
  card.addEventListener('click', () => openModal(card));
});
document.querySelectorAll('.org-card').forEach(card => {
  card.addEventListener('click', () => openModal(card));
});

// Closes the modal upon clicking the close button
document.getElementById('expModalClose').addEventListener('click', () => {
  document.getElementById('expModal').classList.remove('active');
});
document.getElementById('expModal').addEventListener('click', (e) => {
  if (e.target === e.currentTarget) {
    e.currentTarget.classList.remove('active');
  }
});