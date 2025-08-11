import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Plus,
  Save,
  FileText,
  Search,
  MapPin,
  User,
  Package,
  Trash2
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";

interface ConsignmentEntryProps {
  onBack: () => void;
}

interface PalletItem {
  id: string;
  type: string;
  quantity: number;
  weight: number;
  deliveryCharge: number;
  hubCharge: number;
}

function ConsignmentEntry({ onBack }: ConsignmentEntryProps) {
  const navigate = useNavigate();
  const navigateback = () => navigate("/dashboarddetails");
  const [palletItems, setPalletItems] = useState<PalletItem[]>([
    {
      id: "1",
      type: "Standard Pallet",
      quantity: 1,
      weight: 25,
      deliveryCharge: 15.5,
      hubCharge: 8.0
    }
  ]);

  const [formData, setFormData] = useState({
    // Consignment Details
    manifestDate: "26/07/2023",
    requestDeport: "062",
    tel: "(0208 318 8151)",
    accountCode: "",
    customerRef: "",
    depotRef: "",

    // Delivery Details
    postcode: "",
    consignee: "",
    address1: "",
    address2: "",
    town: "",
    county: "",
    contact: "",
    telephone: "",
    telephone2: "",
    email: "",
    service: "Standard",
    selfDelivery: false,
    specialInstructions: ""
  });

  const addPalletItem = () => {
    const newItem: PalletItem = {
      id: Date.now().toString(),
      type: "Standard Pallet",
      quantity: 1,
      weight: 0,
      deliveryCharge: 0,
      hubCharge: 0
    };
    setPalletItems([...palletItems, newItem]);
  };

  const removePalletItem = (id: string) => {
    setPalletItems(palletItems.filter((item) => item.id !== id));
  };

  const updatePalletItem = (id: string, field: keyof PalletItem, value: any) => {
    setPalletItems(
      palletItems.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // const handleSave = () => {
  //   console.log("Saving consignment:", formData, palletItems);
  //   // In a real app, this would submit to an API
  // };

  const totalWeight = palletItems.reduce((sum, item) => sum + item.weight * item.quantity, 0);
  const totalDeliveryCharges = palletItems.reduce((sum, item) => sum + item.deliveryCharge, 0);
  const totalHubCharges = palletItems.reduce((sum, item) => sum + item.hubCharge, 0);
  const grandTotal = totalDeliveryCharges + totalHubCharges;

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
              <h1 className="text-xl font-semibold text-gray-900">New Consignment Entry</h1>
              <Badge variant="outline" className="ml-2">
                Draft
              </Badge>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                <FileText className="h-4 w-4 mr-2" />
                Preview
              </Button>
              <Button onClick={navigateback} size="sm">
                <Save className="h-4 w-4 mr-2" />
                Save Entry
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Consignment Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5 text-blue-600" />
                  <span>Consignment Details</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="manifestDate">Manifest Date</Label>
                    <Input
                      id="manifestDate"
                      value={formData.manifestDate}
                      onChange={(e) => handleInputChange("manifestDate", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="requestDeport">Request Deport</Label>
                    <Input
                      id="requestDeport"
                      value={formData.requestDeport}
                      onChange={(e) => handleInputChange("requestDeport", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tel">Tel</Label>
                    <Input
                      id="tel"
                      value={formData.tel}
                      onChange={(e) => handleInputChange("tel", e.target.value)}
                    />
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="accountCode">Account Code</Label>
                    <div className="relative">
                      <Input
                        id="accountCode"
                        placeholder="Enter account code"
                        value={formData.accountCode}
                        onChange={(e) => handleInputChange("accountCode", e.target.value)}
                      />
                      <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="customerRef">Customer Reference</Label>
                    <Input
                      id="customerRef"
                      placeholder="Customer reference"
                      value={formData.customerRef}
                      onChange={(e) => handleInputChange("customerRef", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="depotRef">Depot Reference</Label>
                    <Input
                      id="depotRef"
                      placeholder="Depot reference"
                      value={formData.depotRef}
                      onChange={(e) => handleInputChange("depotRef", e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Delivery Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-green-600" />
                  <span>Delivery Details</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="postcode">Postcode *</Label>
                    <div className="relative">
                      <Input
                        id="postcode"
                        placeholder="Enter postcode"
                        value={formData.postcode}
                        onChange={(e) => handleInputChange("postcode", e.target.value)}
                        className="pr-10"
                      />
                      <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="service">Service</Label>
                    <Select
                      value={formData.service}
                      onValueChange={(value) => handleInputChange("service", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Standard">Standard</SelectItem>
                        <SelectItem value="Express">Express</SelectItem>
                        <SelectItem value="Next Day">Next Day</SelectItem>
                        <SelectItem value="48 Hour">48 Hour</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="consignee">Consignee *</Label>
                    <Input
                      id="consignee"
                      placeholder="Enter consignee name"
                      value={formData.consignee}
                      onChange={(e) => handleInputChange("consignee", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact">Contact</Label>
                    <Input
                      id="contact"
                      placeholder="Contact person"
                      value={formData.contact}
                      onChange={(e) => handleInputChange("contact", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address1">Address Line 1 *</Label>
                  <Input
                    id="address1"
                    placeholder="Enter address"
                    value={formData.address1}
                    onChange={(e) => handleInputChange("address1", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address2">Address Line 2</Label>
                  <Input
                    id="address2"
                    placeholder="Enter address line 2"
                    value={formData.address2}
                    onChange={(e) => handleInputChange("address2", e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="town">Town *</Label>
                    <Input
                      id="town"
                      placeholder="Enter town"
                      value={formData.town}
                      onChange={(e) => handleInputChange("town", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="county">County</Label>
                    <Input
                      id="county"
                      placeholder="Enter county"
                      value={formData.county}
                      onChange={(e) => handleInputChange("county", e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="telephone">Telephone</Label>
                    <Input
                      id="telephone"
                      placeholder="Phone number"
                      value={formData.telephone}
                      onChange={(e) => handleInputChange("telephone", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="telephone2">Telephone 2</Label>
                    <Input
                      id="telephone2"
                      placeholder="Alternative phone"
                      value={formData.telephone2}
                      onChange={(e) => handleInputChange("telephone2", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Email address"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="specialInstructions">Special Instructions</Label>
                  <Textarea
                    id="specialInstructions"
                    placeholder="Enter any special delivery instructions"
                    rows={3}
                    value={formData.specialInstructions}
                    onChange={(e) => handleInputChange("specialInstructions", e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Pallet Details */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <Package className="h-5 w-5 text-orange-600" />
                    <span>Pallet Details</span>
                  </CardTitle>
                  <Button onClick={addPalletItem} variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Pallet
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Pallet Type</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Weight (kg)</TableHead>
                      <TableHead>Delivery Charge</TableHead>
                      <TableHead>Hub Charge</TableHead>
                      <TableHead className="w-10"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {palletItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <Select
                            value={item.type}
                            onValueChange={(value) => updatePalletItem(item.id, "type", value)}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Standard Pallet">Standard Pallet</SelectItem>
                              <SelectItem value="Quarter Pallet">Quarter Pallet</SelectItem>
                              <SelectItem value="Half Pallet">Half Pallet</SelectItem>
                              <SelectItem value="Oversized Pallet">Oversized Pallet</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) =>
                              updatePalletItem(item.id, "quantity", parseInt(e.target.value) || 1)
                            }
                            className="w-20"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            min="0"
                            step="0.1"
                            value={item.weight}
                            onChange={(e) =>
                              updatePalletItem(item.id, "weight", parseFloat(e.target.value) || 0)
                            }
                            className="w-24"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            min="0"
                            step="0.01"
                            value={item.deliveryCharge}
                            onChange={(e) =>
                              updatePalletItem(
                                item.id,
                                "deliveryCharge",
                                parseFloat(e.target.value) || 0
                              )
                            }
                            className="w-28"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            min="0"
                            step="0.01"
                            value={item.hubCharge}
                            onChange={(e) =>
                              updatePalletItem(
                                item.id,
                                "hubCharge",
                                parseFloat(e.target.value) || 0
                              )
                            }
                            className="w-24"
                          />
                        </TableCell>
                        <TableCell>
                          {palletItems.length > 1 && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removePalletItem(item.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
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
            {/* Summary Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-purple-600" />
                  <span>Summary</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Total Pallets:</span>
                    <span className="font-medium">
                      {palletItems.reduce((sum, item) => sum + item.quantity, 0)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Total Weight:</span>
                    <span className="font-medium">{totalWeight.toFixed(1)} kg</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Delivery Charges:</span>
                    <span className="font-medium">£{totalDeliveryCharges.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Hub Charges:</span>
                    <span className="font-medium">£{totalHubCharges.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="font-medium">Total:</span>
                    <span className="font-bold text-lg">£{grandTotal.toFixed(2)}</span>
                  </div>
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
                  <FileText className="h-4 w-4 mr-2" />
                  Save as Template
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Search className="h-4 w-4 mr-2" />
                  Load Template
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Package className="h-4 w-4 mr-2" />
                  Duplicate Entry
                </Button>
              </CardContent>
            </Card>

            {/* Required Fields */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Required Fields</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-gray-600 space-y-1">
                  <p>• Postcode</p>
                  <p>• Consignee</p>
                  <p>• Address Line 1</p>
                  <p>• Town</p>
                  <p>• At least one pallet item</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ConsignmentEntry;
