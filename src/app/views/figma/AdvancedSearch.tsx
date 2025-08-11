import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Search,
  RotateCcw,
  Calendar,
  User,
  MapPin,
  Package,
  Hash,
  Filter
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";


interface AdvancedSearchProps {
  onBack: () => void;
  onSearchResults: (results: any[]) => void;
}

interface SearchCriteria {
  dateFrom: string;
  dateTo: string;
  account: string;
  req: string;
  col: string;
  del: string;
  consignee: string;
  postalCode: string;
  service: string;
  status: string;
}

// Mock data for dropdowns - in a real app, these would come from an API
const accountOptions = [
  "AVIVA GROUP LTD",
  "AFRANGROUP",
  "AMAZON UKDC",
  "MANDARIN STONE",
  "GREAT BEAR",
  "EVRI EXPRESS",
  "KUEHNE + NAGEL",
  "JAMES CARGO LTD",
  "DPD LOGISTICS",
  "BIBBY DISTRIBUTION",
  "ROYAL MAIL",
  "YODEL LTD",
  "XPO LOGISTICS",
  "PALLEX NETWORK",
  "TNT EXPRESS"
];

const serviceOptions = ["NDTL", "AM", "ND", "TMC", "BKIT", "DDAM", "BSTL", "AMTL"];

const statusOptions = ["CRE", "AUT", "TCD", "ATH"];

function AdvancedSearch({ onBack, onSearchResults }: AdvancedSearchProps) {
  const navigate = useNavigate();
  // const navigateback = () => navigate("/dashboarddetails");
  const navigateback = () => navigate(-1);

  const SearchResults = (mockResults) => navigate("/dashboarddetails", { state: { results: mockResults } });
  const [searchCriteria, setSearchCriteria] = useState<SearchCriteria>({
    dateFrom: "",
    dateTo: "",
    account: "",
    req: "",
    col: "",
    del: "",
    consignee: "",
    postalCode: "",
    service: "",
    status: ""
  });

  const [isSearching, setIsSearching] = useState(false);

  const handleInputChange = (field: keyof SearchCriteria, value: string) => {
    setSearchCriteria((prev) => ({ ...prev, [field]: value }));
  };

  const handleClearAll = () => {
    setSearchCriteria({
      dateFrom: "",
      dateTo: "",
      account: "",
      req: "",
      col: "",
      del: "",
      consignee: "",
      postalCode: "",
      service: "",
      status: ""
    });
  };

  const handleSearch = async () => {
    setIsSearching(true);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // In a real app, this would make an API call with the search criteria
    console.log("Searching with criteria:", searchCriteria);

    // Mock search results - in a real app, this would be the API response
    const mockResults = [
      {
        docket: "90069635",
        date: "28/07/2020",
        consignee: "SDSL Ltd",
        account: "AVIVA GROUP LTD",
        req: 94,
        col: 64,
        del: 62,
        weight: 315,
        service: "NDTL",
        status: "CRE",
        pcode: "SEH 5HS"
      }
    ];

    setIsSearching(false);
    // onSearchResults(mockResults);
    SearchResults(mockResults);
    // onBack(); // Navigate back to dashboard with results
    // onBack ? onBack() : navigate("/dashboarddetails");
  };

  const getActiveFiltersCount = () => {
    return Object.values(searchCriteria).filter((value) => value !== "").length;
  };

  const hasActiveFilters = getActiveFiltersCount() > 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={navigateback} className="p-2">
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-xl font-semibold text-gray-900">Advanced Search</h1>
              {hasActiveFilters && (
                <Badge variant="outline" className="ml-2">
                  {getActiveFiltersCount()} filters active
                </Badge>
              )}
            </div>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={handleClearAll}
                disabled={!hasActiveFilters}
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Clear All
              </Button>
              <Button onClick={handleSearch} size="sm" disabled={!hasActiveFilters || isSearching}>
                <Search className="h-4 w-4 mr-2" />
                {isSearching ? "Searching..." : "Search"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Date Range */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-blue-600" />
                <span>Date Range</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dateFrom">Date From</Label>
                  <Input
                    id="dateFrom"
                    type="date"
                    value={searchCriteria.dateFrom}
                    onChange={(e) => handleInputChange("dateFrom", e.target.value)}
                    placeholder="Select start date"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateTo">Date To</Label>
                  <Input
                    id="dateTo"
                    type="date"
                    value={searchCriteria.dateTo}
                    onChange={(e) => handleInputChange("dateTo", e.target.value)}
                    placeholder="Select end date"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Account and Service Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5 text-green-600" />
                <span>Account & Service Details</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="account">Account</Label>
                  <Select
                    value={searchCriteria.account}
                    onValueChange={(value) =>
                      handleInputChange("account", value === "all-accounts" ? "" : value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select account" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-accounts">All Accounts</SelectItem>
                      {accountOptions.map((account) => (
                        <SelectItem key={account} value={account}>
                          {account}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="service">Service</Label>
                  <Select
                    value={searchCriteria.service}
                    onValueChange={(value) =>
                      handleInputChange("service", value === "all-services" ? "" : value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-services">All Services</SelectItem>
                      {serviceOptions.map((service) => (
                        <SelectItem key={service} value={service}>
                          {service}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={searchCriteria.status}
                  onValueChange={(value) =>
                    handleInputChange("status", value === "all-statuses" ? "" : value)
                  }
                >
                  <SelectTrigger className="w-full md:w-1/2">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-statuses">All Statuses</SelectItem>
                    {statusOptions.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Delivery Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-orange-600" />
                <span>Delivery Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="consignee">Consignee</Label>
                  <Input
                    id="consignee"
                    placeholder="Enter consignee name"
                    value={searchCriteria.consignee}
                    onChange={(e) => handleInputChange("consignee", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="postalCode">Postal Code</Label>
                  <Input
                    id="postalCode"
                    placeholder="Enter postal code"
                    value={searchCriteria.postalCode}
                    onChange={(e) => handleInputChange("postalCode", e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Charges & Codes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Hash className="h-5 w-5 text-purple-600" />
                <span>Charges & Codes</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="req">Req</Label>
                  <Input
                    id="req"
                    type="number"
                    placeholder="Enter req value"
                    value={searchCriteria.req}
                    onChange={(e) => handleInputChange("req", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="col">Col</Label>
                  <Input
                    id="col"
                    type="number"
                    placeholder="Enter col value"
                    value={searchCriteria.col}
                    onChange={(e) => handleInputChange("col", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="del">Del</Label>
                  <Input
                    id="del"
                    type="number"
                    placeholder="Enter del value"
                    value={searchCriteria.del}
                    onChange={(e) => handleInputChange("del", e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Search Tips */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Filter className="h-5 w-5 text-gray-600" />
                <span>Search Tips</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-gray-600 space-y-2">
                <p>• Use date ranges to narrow down your search results</p>
                <p>• Combine multiple criteria for more precise results</p>
                <p>• Leave fields empty to include all values for that criteria</p>
                <p>• Numeric fields (Req, Col, Del) support exact value matching</p>
                <p>• Text fields (Consignee, Postal Code) support partial matching</p>
              </div>
            </CardContent>
          </Card>

          {/* Search Summary */}
          {hasActiveFilters && (
            <Card className="bg-blue-50 border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-900">Search Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {searchCriteria.dateFrom && (
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="bg-white">
                        Date From: {searchCriteria.dateFrom}
                      </Badge>
                    </div>
                  )}
                  {searchCriteria.dateTo && (
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="bg-white">
                        Date To: {searchCriteria.dateTo}
                      </Badge>
                    </div>
                  )}
                  {searchCriteria.account && (
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="bg-white">
                        Account: {searchCriteria.account}
                      </Badge>
                    </div>
                  )}
                  {searchCriteria.service && (
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="bg-white">
                        Service: {searchCriteria.service}
                      </Badge>
                    </div>
                  )}
                  {searchCriteria.status && (
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="bg-white">
                        Status: {searchCriteria.status}
                      </Badge>
                    </div>
                  )}
                  {searchCriteria.consignee && (
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="bg-white">
                        Consignee: {searchCriteria.consignee}
                      </Badge>
                    </div>
                  )}
                  {searchCriteria.postalCode && (
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="bg-white">
                        Postal Code: {searchCriteria.postalCode}
                      </Badge>
                    </div>
                  )}
                  {searchCriteria.req && (
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="bg-white">
                        Req: {searchCriteria.req}
                      </Badge>
                    </div>
                  )}
                  {searchCriteria.col && (
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="bg-white">
                        Col: {searchCriteria.col}
                      </Badge>
                    </div>
                  )}
                  {searchCriteria.del && (
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="bg-white">
                        Del: {searchCriteria.del}
                      </Badge>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
export default AdvancedSearch;