const users = [
  { id: 1, email: "user1@geotech.fr", password: "password123", role: "MANAGER" },
  { id: 2, email: "tech1@geotech.fr", password: "secure456", role: "TECHNICIEN" }
];

const User = {
  findByCredentials: (email, password) => {
    return users.find(u => u.email === email && u.password === password);
  },

  findById: (id) => {
    return users.find(u => u.id === id);
  }
};

export default User;