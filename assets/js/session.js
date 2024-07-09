export function initializeSession(duration) {
  let loginTime = localStorage.getItem('loginTime');
  if (!loginTime) {
    loginTime = Date.now();
    localStorage.setItem('loginTime', loginTime);
  }
  const elapsedTime = Date.now() - loginTime;
  const remainingTime = duration - elapsedTime;
  if (remainingTime > 0) {
    setTimeout(() => {
      forceLogout();
    }, remainingTime);
    return true;
  }
  return false;
}

export function forceLogout() {
  document.body.innerHTML = '<div style="display: flex; justify-content: center; align-items: center; height: 100vh; font-size: 24px;">Session expired. Please login again.</div>';
  setTimeout(() => {
    window.location.href = 'https://profile.zlg.gg:1111/auth/steam';
  }, 5000);
  localStorage.removeItem('loginTime');
}
