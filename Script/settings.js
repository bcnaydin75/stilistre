document.addEventListener('DOMContentLoaded', function () {
    const profileBtn = document.getElementById('profileBtn');
    const profileDropdown = document.getElementById('profileDropdown');

    // Toggle dropdown
    profileBtn.addEventListener('click', function () {
        if (profileDropdown) {
            profileDropdown.style.display = profileDropdown.style.display === 'block' ? 'none' : 'block';
        }
    });

    // Close dropdown when clicking outside (only if dropdown is open)
    document.addEventListener('click', function (event) {
        if (profileDropdown && profileDropdown.style.display === 'block' && !profileBtn.contains(event.target) && !profileDropdown.contains(event.target)) {
            profileDropdown.style.display = 'none';
        }
    });
});