// ===========================
// "READ MORE" POP-UP (Purpose, Mission, Vision)
// Safe to load on any page: does nothing if the pop-up is not there.
// ===========================
(function () {
  'use strict';

  const modal = document.getElementById('modal');
  const modalTitle = document.getElementById('modal-title');
  const modalText = document.getElementById('modal-text');
  const closeBtn = document.querySelector('.close');
  const buttons = document.querySelectorAll('.read-more');
  if (!modal || !modalTitle || !modalText || buttons.length === 0) return;

  const details = {
    purpose: {
      title: 'Our Purpose',
      text: 'Our purpose is to create equal opportunities for job seekers across the world. We provide access to essential tools, training, and mentorship that enable people to build successful and sustainable careers.'
    },
    mission: {
      title: 'Our Mission',
      text: 'Our mission is to empower individuals by offering practical career guidance, modern skill development resources, and real-world examples. We aim to make every learner confident and ready to thrive in the job market.'
    },
    vision: {
      title: 'Our Vision',
      text: 'Our vision is to build a strong, inclusive community where all individuals — regardless of their background or experience — can access meaningful employment and develop professionally with lifelong support.'
    }
  };

  let lastFocus = null;

  function openModal(key, trigger) {
    const item = details[key];
    if (!item) return;
    lastFocus = trigger;
    modalTitle.textContent = item.title;
    modalText.textContent = item.text;
    modal.style.display = 'block';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-labelledby', 'modal-title');
    if (closeBtn) closeBtn.focus();
  }

  function closeModal() {
    modal.style.display = 'none';
    if (lastFocus) lastFocus.focus();
  }

  buttons.forEach(b => b.addEventListener('click', () => openModal(b.getAttribute('data-target'), b)));
  if (closeBtn) {
    closeBtn.setAttribute('tabindex', '0');
    closeBtn.setAttribute('role', 'button');
    closeBtn.setAttribute('aria-label', 'Close');
    closeBtn.addEventListener('click', closeModal);
    closeBtn.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); closeModal(); } });
  }
  window.addEventListener('click', e => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && modal.style.display === 'block') closeModal(); });
})();
