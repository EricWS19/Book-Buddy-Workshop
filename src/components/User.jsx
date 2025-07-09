export default function User({ user }) {
  if (!user) return <p>No user data available.</p>;

  return (
    <div className="user-profile">
      <h2>User Profile</h2>
      <p><strong>First Name:</strong> {user.firstName}</p>
      <p><strong>Last Name:</strong> {user.lastName}</p>
      <p><strong>Email:</strong> {user.email}</p>
      {/* Add more fields as needed */}
    </div>
  );
}
