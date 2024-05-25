import { Breadcrumbs } from "@mantine/core";
import { Link } from "react-router-dom";
interface IData {
  title: string;
  href: string;
}
export function Breadcrumb({ data }: { data: IData[] }) {
  const rows = data.map((item, index) => (
    <Link to={item.href} key={index}>
      {item.title}
    </Link>
  ));

  return <Breadcrumbs>{rows}</Breadcrumbs>;
}
