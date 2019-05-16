const navResponsiveness = () => {
  const x = document.getElementById('every-header');
  if (x.className === 'topnav') {
      x.className += ' responsive';
  } else {
      x.className = 'topnav';
  }
};

//dashboard header
const dashboardNavResponsiveness = () => {
  const x = document.getElementById('dashboard');
  if (x.className === 'dashboard-nav') {
      x.className += ' responsive';
  } else {
      x.className = 'dashboard-nav';
  }
};
  
