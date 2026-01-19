export default function Header() {
 const role = localStorage.getItem("role");

 return (
  <div className="header">
   <h3>{role?.toUpperCase()} PANEL</h3>
   <button
    onClick={() => {
     localStorage.clear();
     window.location.href = "/";
    }}
   >
    Logout
   </button>
  </div>
 );
}
