import NavBar from '@/app/_components/NavBar';
export default function HomeLayout({ children }) {
    return (
      <div>
        <NavBar />
        <main>{children}</main>
      </div>
    );
  }