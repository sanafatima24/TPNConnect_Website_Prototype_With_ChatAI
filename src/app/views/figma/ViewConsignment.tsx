import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  FileText,
  MapPin,
  User,
  Package,
  Clock,
  CheckCircle,
  Truck,
  Building2,
  Phone,
  Mail,
  Calendar,
  Hash,
  Printer,
  Download,
  Edit,
  MessageSquare,
  Plus
} from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import { Textarea } from "./ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";

interface ViewConsignmentProps {
  onBack: () => void;
  consignmentData?: any;
}

// Status timeline configuration
const statusSteps = [
  { id: "created", label: "Created", icon: FileText, completed: true },
  { id: "collection", label: "With Collection Depot", icon: Building2, completed: true },
  { id: "transit-hub", label: "In Transit to Hub", icon: Truck, completed: true },
  { id: "at-hub", label: "At Hub", icon: Building2, completed: true },
  { id: "transit-depot", label: "In Transit to Depot", icon: Truck, completed: false },
  { id: "delivery-depot", label: "With Delivery Depot", icon: Building2, completed: false },
  { id: "out-delivery", label: "Out for Delivery", icon: Truck, completed: false },
  { id: "complete", label: "Complete", icon: CheckCircle, completed: false }
];

// Mock pallet tracking data
const palletData = [
  {
    id: 1,
    pallet: "1X 59.73kg - Shipment 1",
    hub: "HU",
    ops: "OPS",
    delivery: "Delivery"
  }
];

function ViewConsignment({ onBack, consignmentData }: ViewConsignmentProps) {
  const navigate = useNavigate();
  const navigateback = () => navigate("/dashboarddetails");
  const [notes, setNotes] = useState(
    "No one on site, person on phone advised the guy there had to leave due to a emergency advised could we deliver tomorrow"
  );
  const [newNote, setNewNote] = useState("");

  // Use passed data or mock data, with safe fallbacks for nested properties
  const consignment = {
    docket: consignmentData?.docket || "90680367",
    customerRef: consignmentData?.customerRef || "2946169",
    consignee: consignmentData?.consignee || "A&G Renovations Ltd",
    postcode: consignmentData?.pcode || consignmentData?.postcode || "SE1 6GJ",
    customer: consignmentData?.account || consignmentData?.customer || "MANDARIN STONE",
    requestingDepot: consignmentData?.requestingDepot || "220",
    collectingDepot: consignmentData?.collectingDepot || "220",
    deliveryDepot: consignmentData?.deliveryDepot || "062",
    manifestDate: consignmentData?.date || consignmentData?.manifestDate || "25/07/2025",
    service: consignmentData?.service || "NDTL",
    weight: consignmentData?.weight ? `${consignmentData.weight}kg` : "335.72kg",
    address: {
      line1: consignmentData?.address?.line1 || consignmentData?.halt || "A&G Renovations Ltd",
      line2: consignmentData?.address?.line2 || "123 Business Park",
      town: consignmentData?.address?.town || "London",
      postcode: consignmentData?.address?.postcode || consignmentData?.pcode || "SE1 6GJ",
      country: consignmentData?.address?.country || "United Kingdom"
    },
    contact: {
      name: consignmentData?.contact?.name || "John Smith",
      phone: consignmentData?.contact?.phone || "(0432 277 782)",
      email: consignmentData?.contact?.email || "john@agrenovations.com"
    },
    charges: {
      hubDelivery: consignmentData?.charges?.hubDelivery || 1.7,
      delivery: consignmentData?.charges?.delivery || 48.0,
      surcharge: consignmentData?.charges?.surcharge || 2.5
    }
  };

  const addNote = () => {
    if (newNote.trim()) {
      const timestamp = new Date().toLocaleString();
      const updatedNotes = `${notes}\n\n${timestamp} - OPERATOR\n${newNote.trim()}`;
      setNotes(updatedNotes);
      setNewNote("");
    }
  };

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
              <h1 className="text-xl font-semibold text-gray-900">View Consignment</h1>
              <Badge variant="outline" className="ml-2">
                {consignment.docket}
              </Badge>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                <Printer className="h-4 w-4 mr-2" />
                Print Labels
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export Details
              </Button>
              <Button variant="outline" size="sm">
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Status Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Tracking Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                {/* Progress Line */}
                <div className="absolute top-6 left-6 w-full h-0.5 bg-gray-200">
                  <div
                    className="h-full bg-blue-500 transition-all duration-300"
                    style={{
                      width: `${
                        (statusSteps.filter((step) => step.completed).length / statusSteps.length) *
                        100
                      }%`
                    }}
                  />
                </div>

                {/* Status Steps */}
                <div className="relative flex justify-between">
                  {statusSteps.map((step, index) => {
                    const Icon = step.icon;
                    return (
                      <div key={step.id} className="flex flex-col items-center space-y-2">
                        <div
                          className={`
                          w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all
                          ${
                            step.completed
                              ? "bg-blue-500 border-blue-500 text-white"
                              : "bg-white border-gray-300 text-gray-400"
                          }
                        `}
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="text-center">
                          <div
                            className={`text-sm font-medium ${
                              step.completed ? "text-blue-600" : "text-gray-500"
                            }`}
                          >
                            {step.label}
                          </div>
                          {step.completed && step.id === "at-hub" && (
                            <div className="text-xs text-gray-500 mt-1">Current Status</div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Consignment Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="h-5 w-5 text-blue-600" />
                    <span>Consignment Details</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="space-y-1">
                        <div className="text-sm text-gray-600">Docket</div>
                        <div className="font-medium">{consignment.docket}</div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-sm text-gray-600">Customer Reference</div>
                        <div className="font-medium">{consignment.customerRef}</div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-sm text-gray-600">Consignee</div>
                        <div className="font-medium">{consignment.consignee}</div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-sm text-gray-600">Customer</div>
                        <div className="font-medium">{consignment.customer}</div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="space-y-1">
                        <div className="text-sm text-gray-600">Manifest Date</div>
                        <div className="font-medium flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span>{consignment.manifestDate}</span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-sm text-gray-600">Service</div>
                        <div className="font-medium">
                          <Badge variant="outline">{consignment.service}</Badge>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-sm text-gray-600">Total Weight</div>
                        <div className="font-medium">{consignment.weight}</div>
                      </div>
                    </div>
                  </div>

                  <Separator className="my-6" />

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <div className="text-sm text-gray-600">Requesting Depot</div>
                      <div className="font-medium">{consignment.requestingDepot}</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm text-gray-600">Collecting Depot</div>
                      <div className="font-medium">{consignment.collectingDepot}</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm text-gray-600">Delivery Depot</div>
                      <div className="font-medium">{consignment.deliveryDepot}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Delivery Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MapPin className="h-5 w-5 text-green-600" />
                    <span>Delivery Information</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="text-sm text-gray-600">Delivery Address</div>
                        <div className="space-y-1">
                          <div className="font-medium">{consignment.address.line1}</div>
                          <div className="text-gray-600">{consignment.address.line2}</div>
                          <div className="text-gray-600">{consignment.address.town}</div>
                          <div className="font-medium">{consignment.address.postcode}</div>
                          <div className="text-gray-600">{consignment.address.country}</div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="text-sm text-gray-600">Contact Information</div>
                        <div className="space-y-3">
                          <div className="flex items-center space-x-2">
                            <User className="h-4 w-4 text-gray-400" />
                            <span className="font-medium">{consignment.contact.name}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Phone className="h-4 w-4 text-gray-400" />
                            <span>{consignment.contact.phone}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Mail className="h-4 w-4 text-gray-400" />
                            <span>{consignment.contact.email}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Pallet Tracking */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Package className="h-5 w-5 text-orange-600" />
                    <span>Pallet Tracking</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>No.</TableHead>
                        <TableHead>Pallet</TableHead>
                        <TableHead>Hub</TableHead>
                        <TableHead>Ops</TableHead>
                        <TableHead>Delivery</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {palletData.map((pallet) => (
                        <TableRow key={pallet.id}>
                          <TableCell>{pallet.id}</TableCell>
                          <TableCell className="font-medium">{pallet.pallet}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{pallet.hub}</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{pallet.ops}</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{pallet.delivery}</Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Charges Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Hash className="h-5 w-5 text-purple-600" />
                    <span>Charges</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Hub Delivery Charge:</span>
                      <span className="font-medium">
                        £{consignment.charges.hubDelivery.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Delivery Charge:</span>
                      <span className="font-medium">
                        £{consignment.charges.delivery.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Delivery Surcharge:</span>
                      <span className="font-medium">
                        £{consignment.charges.surcharge.toFixed(2)}
                      </span>
                    </div>
                    <Separator />
                    <div className="flex justify-between">
                      <span className="font-medium">Total:</span>
                      <span className="font-bold text-lg">
                        £
                        {(
                          consignment.charges.hubDelivery +
                          consignment.charges.delivery +
                          consignment.charges.surcharge
                        ).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Notes Section */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center space-x-2">
                      <MessageSquare className="h-5 w-5 text-indigo-600" />
                      <span>Notes</span>
                    </CardTitle>
                    <Button size="sm" variant="outline">
                      Add Note
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4 text-sm">
                    <div className="whitespace-pre-wrap">{notes}</div>
                  </div>

                  <div className="space-y-3">
                    <Textarea
                      placeholder="Add a new note..."
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                      rows={3}
                    />
                    <Button onClick={addNote} className="w-full" disabled={!newNote.trim()}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Note
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Clock className="h-4 w-4 mr-2" />
                    Track Shipment
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    POD Overview
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Package className="h-4 w-4 mr-2" />
                    Consignment Audit
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Printer className="h-4 w-4 mr-2" />
                    Create/Recreate
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ViewConsignment;
