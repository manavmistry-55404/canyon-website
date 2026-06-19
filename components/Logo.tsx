import Image from "next/image";
import Link from "next/link";

export function Logo() {
  return (
    <Link className="logo-link" href="/" aria-label="Canyon Data Labs home">
      <Image
        className="logo-img-on-light"
        src="/images/canyon-data-labs-logo-dark.png"
        alt="Canyon Data Labs"
        width={566}
        height={144}
        priority
      />
      <Image
        className="logo-img-on-dark"
        src="/images/canyon-data-labs-logo-rgb.png"
        alt="Canyon Data Labs"
        width={900}
        height={227}
        priority
      />
    </Link>
  );
}
