export function Footer() {
  const footerLinks = [
    { url: "https://github.com/MauricioRobayo", name: "GitHub" },
    {
      url: "htts://linkedin.com/mauriciorobayo",
      name: "LinkedIn",
    },
  ];
  return (
    <>
      <hr />
      <footer className="flex flex-col items-center py-16 text-center">
        <small>
          <p>
            The successful warrior is the average man, with laser-like focus.
          </p>
        </small>
        <div className="flex gap-4">
          {footerLinks.map((link) => (
            <a key={link.url}>{link.name}</a>
          ))}
        </div>
      </footer>
    </>
  );
}
