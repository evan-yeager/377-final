import "./home.css";
import { Tabs } from "@chakra-ui/react";
import FAQ from "./faq";
import About from "./about";
import Homepage from "./homepage";

export default function Home() {
  return (
    <>
      <div className="container">
        <Tabs.Root defaultValue="home">
          <Tabs.List style={{ display: "flex", gap: "10px" }}>
            <Tabs.Trigger value="home">Home</Tabs.Trigger>
            <Tabs.Trigger value="about">About</Tabs.Trigger>
            <Tabs.Trigger value="faq">FAQ</Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content value="home">
            <Homepage />
          </Tabs.Content>

          <Tabs.Content value="about">
            <About />
          </Tabs.Content>

          <Tabs.Content value="faq">
            <FAQ />
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </>
  );
}
