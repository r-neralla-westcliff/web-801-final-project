  // Add Enroll buttons only to rows that are Open
    document.querySelectorAll('#scheduleTable tbody tr').forEach((row) => {
      const status = row.querySelector('.availability')?.innerText.trim().toLowerCase();
      const actionCell = row.querySelector('.action');

      if (!actionCell) return;

      if (status === 'open') {
        actionCell.innerHTML = `
          <button type="button" class="btn btn-sm btn-primary btn-enroll">
            Enroll
          </button>`;
      }
    });

    const enrollPanel   = document.getElementById('enrollPanel');
    const enrollForm    = document.getElementById('enrollForm');
    const successAlert  = document.getElementById('enrollSuccess');
    const classNameSpan = document.getElementById('enrollClassName');
    const classHidden   = document.getElementById('enrollClassHidden');
    const cancelBtn     = document.getElementById('cancelEnroll');

    // Open panel on "Enroll" click
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.btn-enroll');
      if (!btn) return;

      const row = btn.closest('tr');
      const className = row.querySelector('.cls-name')?.textContent.trim() || 'Selected Class';

      classNameSpan.textContent = className;
      classHidden.value = className;

      enrollPanel.classList.remove('d-none');
      successAlert.classList.add('d-none');
      enrollPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    // Cancel
    cancelBtn.addEventListener('click', () => {
      enrollPanel.classList.add('d-none');
      enrollForm.classList.remove('was-validated');
      enrollForm.reset();
    });

    // Mock submit
    enrollForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!enrollForm.checkValidity()) {
        e.stopPropagation();
        enrollForm.classList.add('was-validated');
        return;
      }

      // simulate request
      await new Promise(r => setTimeout(r, 700));

      enrollPanel.classList.add('d-none');
      enrollForm.classList.remove('was-validated');
      enrollForm.reset();

      successAlert.classList.remove('d-none');
      successAlert.scrollIntoView({ behavior: 'smooth' });
    });