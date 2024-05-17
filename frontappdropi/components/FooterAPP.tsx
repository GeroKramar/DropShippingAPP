import { Footer } from "flowbite-react";

function FooterAPP() {
  return (
    <>
      <Footer container>
        <div className="w-full text-center">
          <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
            <Footer.Brand
              href="https://flowbite.com"
              src="https://flowbite.com/docs/images/logo.svg"
              alt="Flowbite Logo"
              name="Dropi APP"
            />
            <Footer.LinkGroup>
              <Footer.Link href="#">About</Footer.Link>
              <Footer.Link href="#">Privacy Policy</Footer.Link>
              <Footer.Link href="#">Licensing</Footer.Link>
              <Footer.Link href="#">Contact</Footer.Link>
            </Footer.LinkGroup>
          </div>
          <Footer.Divider />
          <Footer.Copyright
            href="https://github.com/GeroKramar"
            by="Dev Geronimo Kramar™ | Founder Juan Trim"
            year={2024}
          />
        </div>
      </Footer>
    </>
  );
}

export default FooterAPP;