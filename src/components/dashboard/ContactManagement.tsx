
import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import api from "@/lib/api";
import { Loader } from "lucide-react";

interface Contact {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  inquiryType: "training" | "service";
  serviceType?: string;
  createdAt: string;
}

const ContactManagement = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selected, setSelected] = useState<Contact | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchContact = async () => {
    setLoading(true);
    try {
      const res = await api.get("/admin/contact");
      const courseList = Array.isArray(res.data) ? res.data : res.data.data;
      setContacts(courseList || []);
    } catch (err) {
      console.error("Failed to fetch courses", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContact()
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Contact Submissions</h2>
      <div className="bg-white rounded-xl p-4">
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <Loader className="animate-spin w-10 h-10 text-primary" />
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Inquiry Type</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contacts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">No contacts found.</TableCell>
                </TableRow>
              ) : (
                contacts.map((contact) => (
                  <TableRow key={contact._id}>
                    <TableCell className="capitalize">{contact.name}</TableCell>
                    <TableCell>{contact.email}</TableCell>
                    <TableCell className="capitalize">{contact.inquiryType}</TableCell>
                    <TableCell>{new Date(contact.createdAt).toLocaleString()}</TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" variant="outline" onClick={() => setSelected(contact)}>
                            View Details
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Contact Details</DialogTitle>
                          </DialogHeader>
                          {selected && selected._id === contact._id && (
                            <div className="space-y-2">
                              <div><span className="font-medium">Name:</span> {selected.name}</div>
                              <div><span className="font-medium">Email:</span> {selected.email}</div>
                              {selected.phone && <div><span className="font-medium">Phone:</span> {selected.phone}</div>}
                              {selected.subject && <div><span className="font-medium">Subject:</span> {selected.subject}</div>}
                              <div><span className="font-medium">Inquiry Type:</span> {selected.inquiryType}</div>
                              {selected.serviceType && <div><span className="font-medium">Service Type:</span> {selected.serviceType}</div>}
                              <div><span className="font-medium">Message:</span> <div className="whitespace-pre-line bg-gray-50 rounded p-2 mt-1">{selected.message}</div></div>
                              <div><span className="font-medium">Date:</span> {new Date(selected.createdAt).toLocaleString()}</div>
                            </div>
                          )}
                          <DialogClose asChild>
                            <Button variant="secondary" className="mt-4 w-full">Close</Button>
                          </DialogClose>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default ContactManagement;
