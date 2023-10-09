import MainMenu from "./MainMenu";

export default function HomePage({ user }) {
  return (
    <div className="menu-container">
      <h1>Question 101</h1>
      <MainMenu user={user} />
    </div>
  );
}
