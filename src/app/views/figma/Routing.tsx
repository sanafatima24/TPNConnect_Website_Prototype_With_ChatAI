import { useState, useMemo } from "react";
import {
  ArrowLeft,
  Route,
  Truck,
  User,
  MapPin,
  Clock,
  Package,
  Search,
  Filter,
  Download,
  RefreshCw,
  Plus,
  MoreVertical,
  Navigation,
  Settings,
  Calendar,
  FileSpreadsheet,
  Printer,
  Play,
  Pause,
  CheckCircle,
  AlertCircle,
  Map,
  Users,
  BarChart3,
  Trash,
  BrushCleaning,
  Send,
  Eye,
  Edit,
  PackageOpen
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Separator } from "./ui/separator";

interface RoutingProps {
  onBack: () => void;
}

// Mock route data
const mockRouteData = [
  {
    routeNo: "RT18871",
    routeName: "LT70 CLW JST",
    driver: "John Smith",
    vehicleReg: "AB12 CDE",
    pallets: 15,
    weight: "2.5T",
    stops: 8,
    status: "active",
    startTime: "08:00",
    estimatedCompletion: "16:30",
    currentLocation: "London Hub",
    progress: 65,
    phoneNo: "+44 7700 900123",
    service: "Standard",
    priority: "medium"
  },
  {
    routeNo: "RT18144",
    routeName: "V322FT",
    driver: "Sarah Johnson",
    vehicleReg: "FG34 HIJ",
    pallets: 22,
    weight: "3.2T",
    stops: 12,
    status: "completed",
    startTime: "07:30",
    estimatedCompletion: "15:45",
    currentLocation: "Depot",
    progress: 100,
    phoneNo: "+44 7700 900124",
    service: "Express",
    priority: "high"
  },
  {
    routeNo: "RT18717",
    routeName: "ROYSTONE",
    driver: "Mike Wilson",
    vehicleReg: "KL56 MNO",
    pallets: 18,
    weight: "2.8T",
    stops: 10,
    status: "delayed",
    startTime: "09:00",
    estimatedCompletion: "17:15",
    currentLocation: "M25 Junction 8",
    progress: 35,
    phoneNo: "+44 7700 900125",
    service: "Standard",
    priority: "low"
  },
  {
    routeNo: "RT18874",
    routeName: "Dan F",
    driver: "Emma Brown",
    vehicleReg: "PQ78 RST",
    pallets: 8,
    weight: "1.2T",
    stops: 5,
    status: "pending",
    startTime: "10:00",
    estimatedCompletion: "14:30",
    currentLocation: "Awaiting Start",
    progress: 0,
    phoneNo: "+44 7700 900126",
    service: "Express",
    priority: "high"
  },
  {
    routeNo: "RT18455",
    routeName: "Atarak",
    driver: "David Lee",
    vehicleReg: "UV90 WXY",
    pallets: 25,
    weight: "3.8T",
    stops: 15,
    status: "active",
    startTime: "07:00",
    estimatedCompletion: "18:00",
    currentLocation: "Birmingham Hub",
    progress: 45,
    phoneNo: "+44 7700 900127",
    service: "Standard",
    priority: "medium"
  }
];

const statusConfig = {
  active: {
    color: "bg-blue-100 text-blue-800",
    label: "Active",
    icon: Play
  },
  completed: {
    color: "bg-green-100 text-green-800",
    label: "Completed",
    icon: CheckCircle
  },
  delayed: {
    color: "bg-red-100 text-red-800",
    label: "Delayed",
    icon: AlertCircle
  },
  pending: {
    color: "bg-yellow-100 text-yellow-800",
    label: "Pending",
    icon: Pause
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

// Mock unallocated consignments data
const mockUnallocatedData = [
  {
    docket: "90701890",
    date: "28/01/2025",
    consignee: "London Distribution Ltd",
    account: "AVIVA GROUP LTD",
    weight: 280,
    pallets: 3,
    service: "NDTL",
    priority: "high",
    area: "London",
    postcode: "SE1 7TP",
    timeWindow: "09:00-17:00",
    specialInstructions: "Fragile items"
  },
  {
    docket: "90701891",
    date: "28/01/2025",
    consignee: "Birmingham Logistics Hub",
    account: "AMAZON UKDC",
    weight: 450,
    pallets: 5,
    service: "AM",
    priority: "medium",
    area: "Birmingham",
    postcode: "B1 2AA",
    timeWindow: "08:00-12:00",
    specialInstructions: "Loading dock access required"
  },
  {
    docket: "90701892",
    date: "28/01/2025",
    consignee: "Manchester Retail Solutions",
    account: "GREAT BEAR",
    weight: 320,
    pallets: 4,
    service: "ND",
    priority: "low",
    area: "Manchester",
    postcode: "M1 4BT",
    timeWindow: "10:00-16:00",
    specialInstructions: ""
  }
];

function Routing({ onBack }: RoutingProps) {
  const [selectedDate, setSelectedDate] = useState("2025-01-28");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState("routes");

  // Filter routes based on search and status
  const filteredRoutes = useMemo(() => {
    return mockRouteData.filter((route) => {
      const matchesSearch =
        searchTerm === "" ||
        route.routeNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        route.driver.toLowerCase().includes(searchTerm.toLowerCase()) ||
        route.vehicleReg.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        selectedStatus === "" ||
        selectedStatus === "all-statuses" ||
        route.status === selectedStatus;

      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, selectedStatus]);

  // Calculate stats
  const stats = useMemo(() => {
    const total = filteredRoutes.length;
    const active = filteredRoutes.filter((r) => r.status === "active").length;
    const completed = filteredRoutes.filter((r) => r.status === "completed").length;
    const delayed = filteredRoutes.filter((r) => r.status === "delayed").length;
    const totalPallets = filteredRoutes.reduce((sum, r) => sum + r.pallets, 0);

    return { total, active, completed, delayed, totalPallets };
  }, [filteredRoutes]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  };

  const handleOptimizeRoutes = () => {
    console.log("Optimizing routes...");
  };
  const handlePrint = () => {
    console.log("Opening print dialog...");
    window.print();
  };

  const handleExport = () => {
    console.log("Exporting route data...");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      {/* <div className="bg-white border-b"> */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            {/* <Button
                variant="ghost"
                onClick={onBack}
                className="p-2"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-xl font-semibold text-gray-900">
                Route Planning
              </h1> */}
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm" onClick={handlePrint}>
              <Printer className="h-4 w-4 mr-2" />
              Print Runs
            </Button>
            <Button variant="outline" size="sm" onClick={handleExport}>
              <Send className="h-4 w-4 mr-2" />
              Send To Epod
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              New Run
            </Button>
          </div>
        </div>
      </div>
      {/* </div> */}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Filters */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                <div className="flex flex-1 items-center space-x-4">
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-600">Route Date</label>
                    <Input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-40"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-600">Status</label>
                    <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="All" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all-statuses">All Status</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="delayed">Delayed</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search routes, drivers, vehicles..."
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleRefresh}
                    disabled={isRefreshing}
                  >
                    <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
                    {isRefreshing ? "Refreshing..." : "Refresh"}
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Settings className="h-4 w-4 mr-2" />
                        Tools
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Map className="h-4 w-4 mr-2" />
                        View Map
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <BarChart3 className="h-4 w-4 mr-2" />
                        Route Analytics
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <FileSpreadsheet className="h-4 w-4 mr-2" />
                        Export to Excel
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Printer className="h-4 w-4 mr-2" />
                        Print Routes
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Main Content Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="routes">Route Overview</TabsTrigger>
              <TabsTrigger value="map">Route Map</TabsTrigger>
              <TabsTrigger value="unallocated">Unallocated Consignments</TabsTrigger>
            </TabsList>

            <TabsContent value="routes" className="space-y-6">
              {/* Routes Table */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center justify-between"><CardTitle>Routes ({filteredRoutes.length})</CardTitle>
                    <Badge variant="outline" className="ml-2">
                      {selectedDate}
                    </Badge></div>
                    
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <BrushCleaning className="h-4 w-4 mr-2" />
                        Clear Runs
                      </Button>
                      <Button variant="outline" size="sm">
                        <Navigation className="h-4 w-4 mr-2" />
                        Merge Runs
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50">
                        <TableHead>Route</TableHead>
                        <TableHead>Driver</TableHead>
                        <TableHead>Vehicle</TableHead>
                        <TableHead>Load</TableHead>
                        <TableHead>Progress</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>ETA</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredRoutes.map((route) => {
                        const StatusIcon =
                          statusConfig[route.status as keyof typeof statusConfig]?.icon || Clock;

                        return (
                          <TableRow key={route.routeNo} className="hover:bg-gray-50">
                            <TableCell>
                              <div className="space-y-1">
                                <div className="font-medium text-blue-600">{route.routeName}</div>
                                <div className="text-sm text-gray-500">{route.routeNo}</div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="space-y-1">
                                <div className="font-medium">{route.driver}</div>
                                <div className="text-sm text-gray-500">{route.phoneNo}</div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="space-y-1">
                                <div className="font-medium">{route.vehicleReg}</div>
                                <div className="text-sm text-gray-500">{route.service}</div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="space-y-1">
                                <div className="font-medium">{route.pallets} pallets</div>
                                <div className="text-sm text-gray-500">{route.weight}</div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="space-y-1">
                                <div className="flex items-center space-x-2">
                                  <div className="w-16 bg-gray-200 rounded-full h-2">
                                    <div
                                      className="bg-blue-500 h-2 rounded-full transition-all"
                                      style={{
                                        width: `${route.progress}%`
                                      }}
                                    />
                                  </div>
                                  <span className="text-sm font-medium">{route.progress}%</span>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge
                                className={
                                  statusConfig[route.status as keyof typeof statusConfig]?.color
                                }
                              >
                                <StatusIcon className="h-3 w-3 mr-1" />
                                {statusConfig[route.status as keyof typeof statusConfig]?.label}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="space-y-1">
                                <div className="text-sm font-medium">
                                  {route.estimatedCompletion}
                                </div>
                                <div className="text-xs text-gray-500">
                                  Started: {route.startTime}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <MoreVertical className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>
                                    <MapPin className="h-4 w-4 mr-2" />
                                    Track Route
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <User className="h-4 w-4 mr-2" />
                                    Contact Driver
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Trash className="h-4 w-4 mr-2" />
                                    Delete Run
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem>
                                    <Settings className="h-4 w-4 mr-2" />
                                    Edit Route
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="map" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Route Visualization</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="text-center space-y-2">
                      <Map className="h-12 w-12 text-gray-400 mx-auto" />
                      <p className="text-gray-600">Interactive route map would be displayed here</p>
                      <p className="text-sm text-gray-500">
                        Integration with mapping service required
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="unallocated" className="space-y-6">
              {/* Unallocated Consignments Table */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Unallocated Consignments ({mockUnallocatedData.length})</CardTitle>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Navigation className="h-4 w-4 mr-2" />
                        Auto Allocate
                      </Button>
                      <Button variant="outline" size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Create New Route
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50">
                        <TableHead>Docket</TableHead>
                        <TableHead>Consignee</TableHead>
                        <TableHead>Area</TableHead>
                        <TableHead>Load</TableHead>
                        <TableHead>Service</TableHead>
                        <TableHead>Priority</TableHead>
                        <TableHead>Time Window</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockUnallocatedData.map((item) => (
                        <TableRow key={item.docket} className="hover:bg-gray-50">
                          <TableCell>
                            <div className="space-y-1">
                              <div className="font-medium text-blue-600">{item.docket}</div>
                              <div className="text-sm text-gray-500">{item.date}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="font-medium">{item.consignee}</div>
                              <div className="text-sm text-gray-500">{item.postcode}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="text-xs">
                              {item.area}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="font-medium">{item.pallets} pallets</div>
                              <div className="text-sm text-gray-500">{item.weight}kg</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="font-medium">{item.service}</div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              className={
                                priorityConfig[item.priority as keyof typeof priorityConfig]?.color
                              }
                            >
                              {priorityConfig[item.priority as keyof typeof priorityConfig]?.label}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm font-medium">{item.timeWindow}</div>
                            {item.specialInstructions && (
                              <div className="text-xs text-gray-500 mt-1">
                                {item.specialInstructions}
                              </div>
                            )}
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Navigation className="h-4 w-4 mr-2" />
                                  Allocate to Route
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Eye className="h-4 w-4 mr-2" />
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit Consignment
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                  <MapPin className="h-4 w-4 mr-2" />
                                  View on Map
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default Routing;
