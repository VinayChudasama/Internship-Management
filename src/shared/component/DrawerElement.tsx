import { Drawer } from "@mantine/core";

interface IProps {
  title: string;
  drawerOpen: boolean;
  setDrawerOpen: (drawerOpen: boolean) => void;
  children: React.ReactNode;
  navigate?: (path: number) => void;
}
const DrawerElement = ({
  title,
  drawerOpen,
  setDrawerOpen,
  children,
  navigate,
}: IProps) => {
  // close drawer on click of close icon
  function handleCancel() {
    setDrawerOpen(false);
    if (navigate) {
      navigate(-1);
    }
  }
  return (
    // Drawer to open form for adding/updating mentor data
    <Drawer
      className="form-drawer"
      opened={drawerOpen}
      position="right"
      onClose={handleCancel}
      title={title}
      overlayProps={{ backgroundOpacity: 0.6, blur: 5 }}
      size={500}
      styles={{
        title: { fontSize: "20px", fontWeight: "bold" },
        content: { borderRadius: "8px 0 0 8px" },
      }}
      transitionProps={{
        transition: "scale",
        duration: 250,
        timingFunction: "ease",
        // transformOrigin: "center center",
      }}
    >
      {children}
    </Drawer>
  );
};

export default DrawerElement;
