const navigations = [
  { name: "Home", path: "/home", icon: "home" },
  { name: "Dashboard", path: "/dashboard/default", icon: "dashboard" },
  { name: "AI Chat Assistant", path: "/AIAssistant/Chatbot", icon: "assistant" },

  { label: "Operations", type: "label" },
  {
    name: "Operations",
    icon: "local_shipping", // or "dashboard", "layers", etc.
    children: [
      { name: "Dashboard Details", path: "/dashboarddetails", iconText: "DD" },
      { name: "Day End", path: "/", iconText: "D" },
      {
        name: "Browse",
        iconText: "B",
        children: [
          { name: "Quick Browse", path: "/advanced-search", iconText: "Q", nested: true },
          { name: "Browse Deleted", path: "/", iconText: "D" },
          { name: "Browse Discreps", path: "/", iconText: "DI" },
          { name: "Browse XL Capacity", path: "/", iconText: "XL" },
          { name: "Credit Revenue Requests", path: "/", iconText: "C" }
        ]
      },
      {
        name: "Consignment Entry",
        iconText: "C",
        children: [
          { name: "Collection Request", path: "/", iconText: "CR" },
          { name: "Consignment Authorization", path: "/", iconText: "CA" },
          { name: "Consignment Customs", path: "/", iconText: "CC" }
        ]
      },
      { name: "Interaction", path: "/", iconText: "I" },
      { name: "Claims", path: "/", iconText: "CL" },
      { name: "Routing", path: "/routing", iconText: "R" },
      { name: "Trunks", path: "/", iconText: "T" },
      { name: "O Messages", path: "/", iconText: "O" }
    ]
  }

  // { label: "Components", type: "label" },
  // {
  //   name: "Components",
  //   icon: "layers",
  //   // badge: { value: "30+", color: "secondary" },
  //   children: [
  //     { name: "Auto Complete", path: "/material/autocomplete", iconText: "A" },
  //     { name: "Buttons", path: "/material/buttons", iconText: "B" },
  //     { name: "Checkbox", path: "/material/checkbox", iconText: "C" },
  //     { name: "Dialog", path: "/material/dialog", iconText: "D" },
  //     { name: "Expansion Panel", path: "/material/expansion-panel", iconText: "E" },
  //     { name: "Form", path: "/material/form", iconText: "F" },
  //     { name: "Icons", path: "/material/icons", iconText: "I" },
  //     { name: "Menu", path: "/material/menu", iconText: "M" },
  //     { name: "Progress", path: "/material/progress", iconText: "P" },
  //     { name: "Radio", path: "/material/radio", iconText: "R" },
  //     { name: "Switch", path: "/material/switch", iconText: "S" },
  //     { name: "Slider", path: "/material/slider", iconText: "S" },
  //     { name: "Snackbar", path: "/material/snackbar", iconText: "S" },
  //     { name: "Table", path: "/material/table", iconText: "T" }
  //   ]
  // }
];

export default navigations;
