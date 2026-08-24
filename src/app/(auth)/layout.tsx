/**
 * Layout khusus untuk route group (auth): /login, /change-password
 * Tidak merender Navbar — halaman auth adalah full-screen standalone.
 */
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      {children}
    </div>
  );
}
