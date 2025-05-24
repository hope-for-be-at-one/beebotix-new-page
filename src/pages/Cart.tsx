
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Trash2, Plus, Minus, ShoppingCart, Pencil } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { toast } from "sonner";

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, clearCart, updateCustomNote } = useCart();
  const navigate = useNavigate();
  
  // State for note editing
  const [isEditingNote, setIsEditingNote] = useState(false);
  const [currentEditItemId, setCurrentEditItemId] = useState<number | null>(null);
  const [editedNote, setEditedNote] = useState("");
  
  // Calculate cart total
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Open note editing dialog
  const openNoteEditor = (item: typeof cartItems[0]) => {
    setCurrentEditItemId(item.id);
    setEditedNote(item.customNote || "");
    setIsEditingNote(true);
  };

  // Save edited note
  const saveEditedNote = () => {
    if (currentEditItemId !== null) {
      updateCustomNote(currentEditItemId, editedNote);
      toast.success("Note updated successfully");
      setIsEditingNote(false);
      setCurrentEditItemId(null);
    }
  };

  // Handle place order
  const handlePlaceOrder = () => {
    navigate("/place-order");
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <div className="container-custom">
          <div className="mb-8">
            <h1 className="heading-lg mb-2">Your Cart</h1>
            <p className="text-beebotix-gray-dark">
              Review your items before placing your order
            </p>
          </div>

          {cartItems.length === 0 ? (
            <div className="text-center py-16">
              <div className="mb-6">
                <ShoppingCart className="h-16 w-16 mx-auto text-beebotix-gray" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
              <p className="text-beebotix-gray-dark mb-8">
                Looks like you haven't added any products to your cart yet.
              </p>
              <Link to="/products">
                <Button className="bg-beebotix-yellow hover:bg-beebotix-yellow/80 text-beebotix-navy">
                  Browse Products
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-bold">Cart Items</h2>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={clearCart}
                        className="text-beebotix-gray-dark hover:text-red-500"
                      >
                        Clear Cart
                      </Button>
                    </div>
                    
                    <div className="space-y-6">
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex gap-4 py-4 border-b border-gray-100">
                          {/* Product image */}
                          <div className="w-24 h-24 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                            {item.image ? (
                              <img 
                                src={item.image} 
                                alt={item.title} 
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-beebotix-gray">
                                No Image
                              </div>
                            )}
                          </div>
                          
                          {/* Product info */}
                          <div className="flex-grow">
                            <h3 className="font-medium mb-1">{item.title}</h3>
                            {item.category && (
                              <p className="text-sm text-beebotix-gray-dark mb-2">
                                {item.category}
                              </p>
                            )}

                            {/* Custom note section */}
                            {item.customNote && (
                              <div className="bg-gray-50 p-2 rounded-md mb-3 flex justify-between items-start">
                                <div className="text-sm text-beebotix-gray-dark pr-2">
                                  <span className="font-medium">Note:</span> {item.customNote}
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => openNoteEditor(item)}
                                  className="p-1 h-auto"
                                >
                                  <Pencil className="h-3.5 w-3.5 text-beebotix-gray-dark" />
                                </Button>
                              </div>
                            )}
                            
                            <div className="flex items-center justify-between mt-3">
                              <div className="flex items-center space-x-1 border rounded">
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  className="h-8 w-8" 
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                <span className="w-8 text-center">{item.quantity}</span>
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  className="h-8 w-8" 
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>
                              
                              <span className="font-bold currency-inr">
                                {item.price * item.quantity}
                              </span>
                              
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                onClick={() => removeFromCart(item.id)}
                                className="text-beebotix-gray-dark hover:text-red-500"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="md:col-span-1">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-bold mb-6">Order Summary</h2>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-beebotix-gray-dark">Subtotal</span>
                        <span className="font-medium currency-inr">{cartTotal}</span>
                      </div>
                      
                      <div className="border-t pt-4">
                        <div className="flex justify-between font-bold">
                          <span>Total</span>
                          <span className="text-beebotix-navy currency-inr">{cartTotal}</span>
                        </div>
                        <p className="text-sm text-beebotix-gray-dark mt-1">
                          Taxes and shipping will be calculated during checkout
                        </p>
                      </div>
                      
                      <Button 
                        className="w-full bg-beebotix-yellow hover:bg-beebotix-yellow/80 text-beebotix-navy mt-4"
                        onClick={handlePlaceOrder}
                      >
                        Place Order
                      </Button>
                      
                      <Link to="/products">
                        <Button variant="outline" className="w-full mt-2">
                          Continue Shopping
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Dialog for editing notes */}
          <Dialog open={isEditingNote} onOpenChange={setIsEditingNote}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Edit Custom Note</DialogTitle>
              </DialogHeader>
              
              <div className="py-4">
                <Textarea 
                  value={editedNote}
                  onChange={(e) => setEditedNote(e.target.value)}
                  placeholder="Enter your custom requirements..."
                  className="min-h-[120px]"
                />
              </div>
              
              <DialogFooter>
                <Button 
                  variant="outline" 
                  onClick={() => setIsEditingNote(false)}
                >
                  Cancel
                </Button>
                <Button 
                  className="bg-beebotix-yellow hover:bg-beebotix-yellow/80 text-beebotix-navy"
                  onClick={saveEditedNote}
                >
                  Save Changes
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
