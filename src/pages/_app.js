import '@/styles/globals.css';
import "@/styles/App.css";
import { ProSidebarProvider } from "react-pro-sidebar";

export default function App({ Component, pageProps }) {
  return (<ProSidebarProvider><Component {...pageProps} /></ProSidebarProvider>)
}
