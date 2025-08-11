import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import {
  Search,
  Filter,
  Download,
  Plus,
  MoreVertical,
  RefreshCw,
  FileText,
  FileSpreadsheet,
  FileX,
  Printer,
  Group,
  X,
  Columns3Cog,
  Tags,
  FilePenLine,
  FileCheck,
  Square,
  Sparkles,
  Settings,
  Eye,
  MapPin,
  Edit
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "./ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "./ui/pagination";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

// Extended mock data with more entries for better pagination demonstration
const mockData = [
  {
    docket: "90069635",
    date: "28/07/2020",
    halt: "MEL DEPOT - 203 VGG",
    account: "AVIVA GROUP LTD",
    req: 94,
    col: 64,
    del: 62,
    frt: 60,
    cat: 82,
    out: 62,
    weight: 315,
    consignee: "SDSL Ltd",
    pcode: "SEH 5HS",
    complete: "EDIFACT",
    invoices: "SCO WEB",
    service: "NDTL",
    priority: "high",
    status: "CRE"
  },
  {
    docket: "90069738",
    date: "28/07/2020",
    halt: "MEL FREIGHT LTD",
    account: "AFRANGROUP",
    req: 29,
    col: 44,
    del: 62,
    frt: 62,
    cat: 84,
    out: 62,
    weight: 50,
    consignee: "Charles Gifford",
    pcode: "SEH 7LH",
    complete: "Hawkwin/Parcel",
    invoices: "SCO WEB",
    service: "AM",
    priority: "medium",
    status: "AUT"
  },
  {
    docket: "90700077",
    date: "28/07/2020",
    halt: "ADVENT FORWARDING LTD",
    account: "AMAZON UKDC",
    req: 62,
    col: 245,
    del: 62,
    frt: 62,
    cat: 245,
    out: 62,
    weight: 222,
    consignee: "Brenntag UK Ltd",
    pcode: "D48 7DW",
    complete: "Advent Forwarding Ltd",
    invoices: "CAG SER",
    service: "ND",
    priority: "low",
    status: "TCD"
  },
  {
    docket: "90700548",
    date: "28/07/2020",
    halt: "BRAMBLES PLC",
    account: "MANDARIN STONE",
    req: 75,
    col: 78,
    del: 62,
    frt: 62,
    cat: 14,
    out: 62,
    weight: 1250,
    consignee: "AMD Constructions",
    pcode: "SE20 0NW",
    complete: "Brambles plc Ltd",
    invoices: "SCO OVN",
    service: "ND",
    priority: "high",
    status: "CRE"
  },
  {
    docket: "90700642",
    date: "28/07/2020",
    halt: "MANCHESTER STONE",
    account: "GREAT BEAR",
    req: 220,
    col: 220,
    del: 62,
    frt: 220,
    cat: 220,
    out: 62,
    weight: 353,
    consignee: "Malsha Design",
    pcode: "SE1 2DF",
    complete: "AAPC Construction & Renovation",
    invoices: "SEI SRV",
    service: "AM",
    priority: "medium",
    status: "ATH"
  },
  {
    docket: "90700789",
    date: "29/07/2020",
    halt: "SYDNEY LOGISTICS",
    account: "EVRI EXPRESS",
    req: 110,
    col: 85,
    del: 62,
    frt: 95,
    cat: 120,
    out: 62,
    weight: 280,
    consignee: "Junaid Movers",
    pcode: "B18 6DF",
    complete: "Sydney Logistics Co",
    invoices: "SCO WEB",
    service: "TMC",
    priority: "high",
    status: "CRE"
  },
  {
    docket: "90700850",
    date: "29/07/2020",
    halt: "BRISBANE FREIGHT",
    account: "KUEHNE + NAGEL",
    req: 84,
    col: 90,
    del: 62,
    frt: 78,
    cat: 90,
    out: 62,
    weight: 430,
    consignee: "AB Forwarding Ltd",
    pcode: "KT19 7AB",
    complete: "Brisbane Freight Services",
    invoices: "CAG SER",
    service: "BKIT",
    priority: "medium",
    status: "ATH"
  },
  {
    docket: "90700912",
    date: "29/07/2020",
    halt: "PERTH DISTRIBUTION",
    account: "JAMES CARGO LTD",
    req: 120,
    col: 160,
    del: 62,
    frt: 145,
    cat: 180,
    out: 62,
    weight: 412,
    consignee: "Perth Distribution Hub",
    pcode: "UB8 2GA",
    complete: "Perth Distribution Hub",
    invoices: "SCO OVN",
    service: "DDAM",
    priority: "low",
    status: "AUT"
  },
  {
    docket: "90701023",
    date: "30/07/2020",
    halt: "ADELAIDE TRANSPORT",
    account: "DPD LOGISTICS",
    req: 115,
    col: 90,
    del: 62,
    frt: 110,
    cat: 135,
    out: 62,
    weight: 390,
    consignee: "Adelaide Transport Solutions",
    pcode: "GU7 1YH",
    complete: "Adelaide Transport Solutions",
    invoices: "SEI SRV",
    service: "NDTL",
    priority: "high",
    status: "CRE"
  },
  {
    docket: "90701156",
    date: "30/07/2020",
    halt: "DARWIN CARGO",
    account: "BIBBY DISTRIBUTION",
    req: 180,
    col: 210,
    del: 62,
    frt: 190,
    cat: 210,
    out: 62,
    weight: 468,
    consignee: "Darwin Cargo Express",
    pcode: "S2 3GS",
    complete: "Darwin Cargo Express",
    invoices: "SCO WEB",
    service: "NDTL",
    priority: "medium",
    status: "ATH"
  },
  {
    docket: "90701234",
    date: "30/07/2020",
    halt: "HOBART SHIPPING",
    account: "ROYAL MAIL",
    req: 85,
    col: 95,
    del: 62,
    frt: 85,
    cat: 95,
    out: 62,
    weight: 405,
    consignee: "Hobart Shipping Ltd",
    pcode: "E14 5HP",
    complete: "Hobart Shipping Ltd",
    invoices: "CAG SER",
    service: "BSTL",
    priority: "low",
    status: "AUT"
  },
  {
    docket: "90701345",
    date: "31/07/2020",
    halt: "CANBERRA LOGISTICS",
    account: "YODEL LTD",
    req: 73,
    col: 81,
    del: 62,
    frt: 75,
    cat: 88,
    out: 62,
    weight: 323,
    consignee: "Canberra Logistics Group",
    pcode: "LE7 7GU",
    complete: "Canberra Logistics Group",
    invoices: "SCO OVN",
    service: "AMTL",
    priority: "high",
    status: "CRE"
  },
  {
    docket: "90701456",
    date: "31/07/2020",
    halt: "NEWCASTLE FREIGHT",
    account: "XPO LOGISTICS",
    req: 60,
    col: 76,
    del: 62,
    frt: 65,
    cat: 78,
    out: 62,
    weight: 338,
    consignee: "Newcastle Freight Co",
    pcode: "MK10 0AA",
    complete: "Newcastle Freight Co",
    invoices: "SEI SRV",
    service: "ND",
    priority: "medium",
    status: "ATH"
  },
  {
    docket: "90701567",
    date: "31/07/2020",
    halt: "WOLLONGONG CARGO",
    account: "PALLEX NETWORK",
    req: 90,
    col: 102,
    del: 62,
    frt: 88,
    cat: 102,
    out: 62,
    weight: 360,
    consignee: "Wollongong Cargo Services",
    pcode: "LS12 1EG",
    complete: "Wollongong Cargo Services",
    invoices: "SCO WEB",
    service: "ND",
    priority: "low",
    status: "AUT"
  },
  {
    docket: "90701678",
    date: "01/08/2020",
    halt: "GOLD COAST EXPRESS",
    account: "TNT EXPRESS",
    req: 128,
    col: 150,
    del: 62,
    frt: 125,
    cat: 145,
    out: 62,
    weight: 390,
    consignee: "Gold Coast Express Delivery",
    pcode: "EC3M 4BS",
    complete: "Gold Coast Express Delivery",
    invoices: "CAG SER",
    service: "NDTL",
    priority: "high",
    status: "CRE"
  }
];

const statusConfig = {
  delivered: {
    color: "bg-green-100 text-green-800",
    label: "Delivered"
  },
  transit: {
    color: "bg-blue-100 text-blue-800",
    label: "In Transit"
  },
  pending: {
    color: "bg-yellow-100 text-yellow-800",
    label: "Pending"
  }
};

const priorityConfig = {
  high: { color: "bg-red-100 text-red-800", label: "High" },
  medium: {
    color: "bg-orange-100 text-orange-800",
    label: "Medium"
  },
  low: { color: "bg-gray-100 text-gray-800", label: "Low" }
};

const groupByOptions = [
  { value: "status", label: "Status" },
  { value: "account", label: "Account" },
  { value: "date", label: "Date" },
  { value: "priority", label: "Priority" },
  { value: "service", label: "Service" }
];

// const navigate = useNavigate();

// const goNewEntry = () => navigate("/new-entry");
// const goAdvanced = () => navigate("/advanced-search");
// const goView = (row: any) => navigate(`/view-consignment/${row.docket}`, { state: row });

interface DashboardProps {
  onNavigateToNewEntry: () => void;
  onNavigateToAdvancedSearch: () => void;
  onNavigateToViewConsignment: (consignmentData: any) => void;
  onNavigateToRouting: () => void;
  searchResults?: any[];
}

function DashboardDetails(
  //   {
  //   onNavigateToNewEntry,
  //   onNavigateToAdvancedSearch,
  //   onNavigateToViewConsignment,
  //   onNavigateToRouting,
  //   searchResults = []
  // }
  props: DashboardProps
) {
  const navigate = useNavigate(); // top-level inside component

  const goNewEntry = () => navigate("/new-entry");
  const goAdvanced = () => navigate("/advanced-search");
  const goView = (row: any) => navigate(`/view-consignment/${row.docket}`, { state: row });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [groupBy, setGroupBy] = useState<string>("");

  const { searchResults = [] } = props;
  const location = useLocation() as any;

  // keep a local copy of results that came via navigate(..., { state })
  const [routeResults, setRouteResults] = useState<any[]>([]);

  useEffect(() => {
    const incoming = location?.state?.results;
    // only capture once per navigation
    if (incoming && incoming.length && routeResults.length === 0) {
      setRouteResults(incoming);

      // OPTIONAL: clear router state AFTER we copied, so refresh won’t reapply
      // but won’t flicker because UI now uses routeResults
      navigate(location.pathname, { replace: true, state: { consumed: true } });
    }
    // run once per navigation change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.key]);

  // Prefer local copy > prop > mock
  const externalResults = routeResults.length
    ? routeResults
    : props.searchResults?.length
    ? props.searchResults
    : [];
  const dataToDisplay = externalResults.length ? externalResults : mockData;
  const hasSearchResults = externalResults.length > 0;

  // “Clear Search” should clear your local copy (not reload the page)
  const clearSearch = () => setRouteResults([]);

  // const routeResults = location?.state?.results ?? [];

  // useEffect(() => {
  //   if (routeResults.length) {
  //     // strip state from history entry
  //     navigate(location.pathname, { replace: true, state: null });
  //   }
  // }, [routeResults.length, navigate, location.pathname]);

  // const dataToDisplay = searchResults.length
  //   ? searchResults
  //   : routeResults.length
  //   ? routeResults
  //   : mockData;
  // const hasSearchResults = dataToDisplay !== mockData;

  // // Use search results if available, otherwise use mock data
  // const dataToDisplay = searchResults.length > 0 ? searchResults : mockData;
  // const hasSearchResults = searchResults.length > 0;

  // Group data by selected column
  const groupedData = useMemo(() => {
    if (!groupBy) return { ungrouped: dataToDisplay };

    return dataToDisplay.reduce((groups, item) => {
      const key = item[groupBy as keyof typeof item].toString();
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(item);
      return groups;
    }, {} as Record<string, typeof dataToDisplay>);
  }, [groupBy, dataToDisplay]);

  // const groupedData = useMemo(() => {
  //   if (!groupBy) return { ungrouped: dataToDisplay };

  //   return dataToDisplay.reduce((groups, item) => {
  //     let raw = item[groupBy as keyof typeof item];
  //     let key =
  //       raw == null
  //         ? ""
  //         : typeof raw === "object"
  //         ? JSON.stringify(raw)
  //         : String(raw);

  //     if (!groups[key]) {
  //       groups[key] = [];
  //     }
  //     groups[key].push(item);
  //     return groups;
  //   }, {} as Record<string, typeof dataToDisplay>);
  // }, [groupBy, dataToDisplay]);

  // Flatten grouped data for pagination when grouped
  const flattenedData = useMemo(() => {
    if (!groupBy) return dataToDisplay;

    const flattened: any[] = [];
    Object.entries(groupedData).forEach(([groupName, items]) => {
      // Add group header
      flattened.push({
        isGroupHeader: true,
        groupName,
        groupBy,
        count: items.length
      });
      // Add items
      flattened.push(...items);
    });
    return flattened;
  }, [groupedData, groupBy, dataToDisplay]);

  // Calculate pagination
  const totalItems = flattenedData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = flattenedData.slice(startIndex, endIndex);

  // Handle view consignment click
  const handleViewConsignment = (item: any) => {
    goView(item);
  };

  // Get display value for group headers
  const getGroupDisplayValue = (groupName: string, groupByField: string) => {
    if (groupByField === "status") {
      return statusConfig[groupName as keyof typeof statusConfig]?.label || groupName;
    }
    if (groupByField === "priority") {
      return priorityConfig[groupName as keyof typeof priorityConfig]?.label || groupName;
    }
    return groupName;
  };

  // Refresh function
  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  };

  // Group By functions
  const handleGroupBy = (column: string) => {
    setGroupBy(column);
    setCurrentPage(1);
  };

  const clearGroupBy = () => {
    setGroupBy("");
    setCurrentPage(1);
  };

  // Export functions
  const handleExportPDF = () => {
    console.log("Exporting to PDF...");
    // In a real app, you would implement PDF export logic here
    // For example: jsPDF library or server-side PDF generation
  };

  const handleExportExcel = () => {
    console.log("Exporting to Excel...");
    // In a real app, you would implement Excel export logic here
    // For example: xlsx library
  };

  const handleExportCSV = () => {
    console.log("Exporting to CSV...");
    // Simple CSV export implementation
    const headers = [
      "Docket",
      "Date",
      "Destination",
      "Account",
      "Freight",
      "Service",
      "Priority",
      "Status"
    ];
    const csvContent = [
      headers.join(","),
      ...dataToDisplay.map((item) =>
        [
          item.docket,
          item.date,
          `"${item.halt}"`,
          item.account,
          item.frt,
          item.service,
          item.priority,
          item.status
        ].join(",")
      )
    ].join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;"
    });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "consignments.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    console.log("Opening print dialog...");
    window.print();
  };

  // Export functions
  const handlefilter = () => {
    console.log("filterin...");
  };

  // Generate page numbers for pagination
  const generatePageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("ellipsis");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("ellipsis");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("ellipsis");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("ellipsis");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      {/* <div className="bg-white border-b"> */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex space-x-8">
              {/* <button
                  onClick={onNavigateToRouting}
                  className="text-gray-600 hover:text-gray-900 cursor-pointer border-none bg-transparent p-0"
                >
                  Routing
                </button> */}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Printer className="h-4 w-4 mr-2" />
                  Print Option
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handlePrint}>
                  <Tags className="h-4 w-4 mr-2" />
                  Print Delivery Labels
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handlePrint}>
                  <FileCheck className="h-4 w-4 mr-2" />
                  Print Summary Sheet
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handlePrint}>
                  <FilePenLine className="h-4 w-4 mr-2" />
                  Print Manifest Report
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleExportPDF}>
                  <FileText className="h-4 w-4 mr-2" />
                  Export as PDF
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleExportExcel}>
                  <FileSpreadsheet className="h-4 w-4 mr-2" />
                  Export as Excel
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleExportCSV}>
                  <FileX className="h-4 w-4 mr-2" />
                  Export as CSV
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handlePrint}>
                  <Printer className="h-4 w-4 mr-2" />
                  Print
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button size="sm" onClick={goNewEntry}>
              <Plus className="h-4 w-4 mr-2" />
              New Entry
            </Button>
          </div>
        </div>
      </div>
      {/* </div> */}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Results Banner */}
        {hasSearchResults && (
          <Card className="mb-6 bg-green-50 border-green-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Search className="h-5 w-5 text-green-600" />
                  <span className="font-medium text-green-900">Search Results</span>
                  <Badge variant="outline" className="bg-white">
                    1 results found
                  </Badge>
                </div>
                <Button variant="outline" size="sm" onClick={clearSearch}>
                  <X className="h-4 w-4 mr-2" />
                  Clear Search
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Stats Cards
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Consignments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {hasSearchResults ? searchResults.length : 88}
              </div>
              <p className="text-xs text-green-600 mt-1">
                {hasSearchResults ? "From search" : "+12% from last month"}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">In Transit</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">55</div>
              <p className="text-xs text-blue-600 mt-1">Active shipments</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Delivered Today</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">19</div>
              <p className="text-xs text-green-600 mt-1">On schedule</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Pending</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">14</div>
              <p className="text-xs text-yellow-600 mt-1">Require attention</p>
            </CardContent>
          </Card>
        </div> */}

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="flex flex-1 items-center space-x-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search by docket, account, or destination..."
                    className="pl-10"
                  />
                </div>
                <Button variant="outline" size="sm" onClick={goAdvanced}>
                  <Settings className="h-4 w-4 mr-2" />
                  Advanced Search
                </Button>
                {groupBy && (
                  <Button variant="outline" size="sm" onClick={clearGroupBy}>
                    <X className="h-4 w-4 mr-2" />
                    Clear Grouping
                  </Button>
                )}
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">Show:</span>
                  <Select
                    value={itemsPerPage.toString()}
                    onValueChange={(value) => {
                      setItemsPerPage(parseInt(value));
                      setCurrentPage(1);
                    }}
                  >
                    <SelectTrigger className="w-20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5</SelectItem>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="20">20</SelectItem>
                      <SelectItem value="50">50</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="text-sm text-gray-500">
                  Showing {startIndex + 1}-{Math.min(endIndex, totalItems)} of {totalItems}{" "}
                  {groupBy ? "items" : "consignments"}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{hasSearchResults ? "Search Results" : "Recent Consignments"}</CardTitle>
              <div className="flex items-center space-x-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={handlefilter}>
                      <Square className="h-4 w-4 mr-2" />
                      Inbound Manifest
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handlefilter}>
                      <Square className="h-4 w-4 mr-2" />
                      Outbound Manifest
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handlefilter}>
                      <Square className="h-4 w-4 mr-2" />
                      Local Deliveries
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Group className="h-4 w-4 mr-2" />
                      Group By
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {groupByOptions.map((option) => (
                      <DropdownMenuItem
                        key={option.value}
                        onClick={() => handleGroupBy(option.value)}
                      >
                        {option.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isRefreshing}>
                  <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
                  {isRefreshing ? "Refreshing..." : "Refresh"}
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead>Docket</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Consignee</TableHead>
                  <TableHead>Account</TableHead>
                  <TableHead>Req</TableHead>
                  <TableHead>Col</TableHead>
                  <TableHead>Del</TableHead>
                  <TableHead>Weight</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Status</TableHead>

                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentData.map((item, index) => {
                  // Render group header
                  if (item.isGroupHeader) {
                    return (
                      <TableRow key={`group-${item.groupName}`} className="bg-gray-100">
                        <TableCell colSpan={11} className="py-3">
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline" className="text-sm">
                              {getGroupDisplayValue(item.groupName, item.groupBy)}
                            </Badge>
                            <span className="text-sm text-gray-600">({item.count} items)</span>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  }

                  // Render regular data row
                  return (
                    <TableRow key={item.docket} className="hover:bg-gray-50">
                      <TableCell className="font-medium text-blue-600">{item.docket}</TableCell>
                      <TableCell className="text-gray-600">{item.date}</TableCell>
                      <TableCell>
                        <div className="max-w-xs">
                          <div className="font-medium truncate">{item.consignee}</div>
                          <div className="text-sm text-gray-500 truncate">{item.pcode}</div>
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-600">{item.account}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs">
                          {item.req}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs">
                          {item.col}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs">
                          {item.del}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs">
                          {item.weight}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">{item.service}</TableCell>
                      <TableCell className="font-medium">{item.status}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleViewConsignment(item)}>
                              <Eye className="h-4 w-4 mr-2" />
                              View Consignment
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <MapPin className="h-4 w-4 mr-2" />
                              Track Shipment
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>

            {/* Pagination */}
            <div className="flex items-center justify-between px-6 py-4 border-t">
              <div className="text-sm text-gray-500">
                Page {currentPage} of {totalPages}
                {groupBy && (
                  <span className="ml-2 text-blue-600">
                    (Grouped by {groupByOptions.find((opt) => opt.value === groupBy)?.label})
                  </span>
                )}
                {hasSearchResults && <span className="ml-2 text-green-600">(Search Results)</span>}
              </div>
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      className={
                        currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"
                      }
                    />
                  </PaginationItem>

                  {generatePageNumbers().map((page, index) => (
                    <PaginationItem key={index}>
                      {page === "ellipsis" ? (
                        <PaginationEllipsis />
                      ) : (
                        <PaginationLink
                          onClick={() => setCurrentPage(page as number)}
                          isActive={currentPage === page}
                          className="cursor-pointer"
                        >
                          {page}
                        </PaginationLink>
                      )}
                    </PaginationItem>
                  ))}

                  <PaginationItem>
                    <PaginationNext
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      className={
                        currentPage === totalPages
                          ? "pointer-events-none opacity-50"
                          : "cursor-pointer"
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default DashboardDetails;
