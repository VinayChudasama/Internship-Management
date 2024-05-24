import { Input } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";

const Searchbox = ({ placeholder }: { placeholder: string | null }) => {
  return (
    <Input
      leftSection={<IconSearch color="#000" size={16} />}
      placeholder={`Search ${placeholder}`}
    />
  );
};

export default Searchbox;
