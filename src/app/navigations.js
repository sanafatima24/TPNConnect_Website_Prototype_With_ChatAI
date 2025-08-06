const navigations = [
  { name: "Home", path: "/home", icon: "home" },
  { name: "Dashboard", path: "/dashboard/default", icon: "dashboard" },
  { name: "AI Chat Assistant", path: "/AIAssistant/Chatbot", icon: "assistant" },

  { label: "Operations", type: "label" },
  {
    name: "Operations",
    icon: "local_shipping", // or "dashboard", "layers", etc.
    children: [
      { name: "Day End", path: "/", iconText: "D" },
      {
        name: "Browse",
        iconText: "B",
        children: [
          { name: "Quick Browse", path: "/", iconText: "Q", nested: true },
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
      { name: "Routing", path: "/", iconText: "R" },
      { name: "Trunks", path: "/", iconText: "T" },
      { name: "O Messages", path: "/", iconText: "O" }
    ]
  }
];

export default navigations;
