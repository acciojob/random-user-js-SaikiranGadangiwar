//your code here

const userPhoto = document.getElementById('user-photo');
const userName = document.getElementById('user-name');
const additionalInfo = document.getElementById('additional-info');
const getUserButton = document.getElementById('getUser');

function displayUser(user) {
  // Set the user photo
  userPhoto.src = user.picture.large;

  // Set the user name
  const fullName = `${user.name.first} ${user.name.last}`;
  userName.textContent = fullName;

  // Clear any additional info that was previously displayed
  additionalInfo.textContent = '';
}

function displayAdditionalInfo(user, attr) {
  if (attr === 'age') {
    const age = user.dob.age;
    additionalInfo.textContent = `${age}`;
  } else if (attr === 'email') {
    const email = user.email;
    additionalInfo.textContent = `${email}`;
  } else if (attr === 'phone') {
    const phone = user.phone;
    additionalInfo.textContent = `${phone}`;
  }
}

function getUser() {
  // Make a request to the API to get a random user
  fetch('https://randomuser.me/api/')
    .then((response) => response.json())
    .then((data) => {
      const user = data.results[0];
      displayUser(user);

      // Display additional info based on the button click
      const buttons = document.querySelectorAll('button[data-attr]');
      buttons.forEach((button) => {
        button.addEventListener('click', () => {
          const attr = button.getAttribute('data-attr');
          displayAdditionalInfo(user, attr);
        });
      });
    });
}

// Get a user when the page loads
getUser();

// Get a new user when the "Get User" button is clicked
getUserButton.addEventListener('click', getUser);

