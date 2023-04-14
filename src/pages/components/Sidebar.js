import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import { useRouter } from "next/router";

function Side() {
  const { collapseSidebar } = useProSidebar();
  const router = useRouter();

  return (
    <div>
      <Sidebar width={"250px"}>
        <Menu>
          <MenuItem> Cursos</MenuItem>
          <MenuItem> Actividades</MenuItem>
          <MenuItem onClick={() => router.push('/competencias')}> Definir SCC</MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
}
export default Side;
