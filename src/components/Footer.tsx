const Footer = () => {
  const currentYear = new Date().toLocaleDateString("en-GB", {
    year: "numeric",
  });

  return (
    <div className="flex justify-center px-6 pb-4 text-xs text-muted-foreground">
      <p>© copyright {currentYear} - Tom Rousseau</p>
    </div>
  );
};

export default Footer;
