export const fullName = (users) => {
    return `${users.first_name} ${users.last_name} ${users.email}`.toLowerCase();
};
