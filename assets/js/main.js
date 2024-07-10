import { fetchUserProfile } from './api.js';
import { initializeSession, forceLogout } from './session.js';
import { displayUserProfile } from './userProfile.js';
import { initializePopovers } from './popovers.js';
import { displayMedals } from './medals.js';
import { fetchMockUserProfile, fetchMockUserStats } from './mock.js';
import { initializeCharts } from './charts.js';

/* -------------------------------------------------------------------------- */
/*                                  Preloader                                 */
/* -------------------------------------------------------------------------- */
var preloaderInit = function preloaderInit() {
  var preloader = document.querySelector('.preloader');
  setTimeout(function () {
    preloader?.classList.add('loaded');
    setTimeout(function () {
      preloader?.remove();
    }, 0); // Remove preloader immediately after setting it to 'loaded'
  }, 3000); // Keep the preloader for 5 seconds
};

const SESSION_DURATION = 14.5 * 60 * 1000; // 14.5 minutes in milliseconds

document.addEventListener("DOMContentLoaded", () => {
  const token = new URLSearchParams(window.location.search).get("token");
  if (!token) {
    console.error("No token found, using mock data");
    fetchMockUserProfile();
    fetchMockUserStats();
    preloaderInit(); // Initialize preloader for mock data
    return;
  }

  if (!initializeSession(SESSION_DURATION)) {
    forceLogout();
    return;
  }

  fetchUserProfile(token).then(user => {
    displayUserProfile(user);
    displayMedals(user);
    initializePopovers();
    initializeCharts(user);
    preloaderInit(); // Initialize preloader for real data
  }).catch(error => {
    console.error("Error fetching user profile:", error);
    fetchMockUserProfile();
    preloaderInit(); // Initialize preloader for mock data on error
  });
});

const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
