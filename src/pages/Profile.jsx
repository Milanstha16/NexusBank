import React, { useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Shield,
  Edit3,
  Check,
  X,
} from "lucide-react";

import { useAuth } from "../context/useAuth";
import { formatDate } from "../data/mockData";
import {
  BankingCard,
  BankingCardHeader,
  BankingCardTitle,
} from "../components/banking/BankingCard";
import { BankingInput } from "../components/banking/BankingInput";
import { BankingButton } from "../components/banking/BankingButton";
import { toast } from "../hooks/use-toast";

const Profile = () => {
  const { user, updateUser } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    street: user?.address?.street || "",
    city: user?.address?.city || "",
    state: user?.address?.state || "",
    zipCode: user?.address?.zipCode || "",
  });

  const handleSave = async () => {
    setIsSaving(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    updateUser({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      address: {
        ...user.address,
        street: formData.street,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
      },
    });

    setIsSaving(false);
    setIsEditing(false);
    toast({
      title: "Profile updated",
      description: "Your profile information has been saved successfully.",
    });
  };

  const handleCancel = () => {
    setFormData({
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      phone: user?.phone || "",
      street: user?.address?.street || "",
      city: user?.address?.city || "",
      state: user?.address?.state || "",
      zipCode: user?.address?.zipCode || "",
    });
    setIsEditing(false);
  };

  if (!user) return null;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
            My Profile
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage your personal information
          </p>
        </div>

        {!isEditing ? (
          <BankingButton
            onClick={() => setIsEditing(true)}
            icon={<Edit3 className="w-4 h-4" />}
          >
            Edit Profile
          </BankingButton>
        ) : (
          <div className="flex gap-3">
            <BankingButton
              variant="outline"
              onClick={handleCancel}
              icon={<X className="w-4 h-4" />}
            >
              Cancel
            </BankingButton>
            <BankingButton
              onClick={handleSave}
              isLoading={isSaving}
              icon={<Check className="w-4 h-4" />}
            >
              Save Changes
            </BankingButton>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <BankingCard variant="elevated" padding="lg" className="text-center">
            <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl font-bold text-primary-foreground">
                {user.firstName.charAt(0)}
                {user.lastName.charAt(0)}
              </span>
            </div>
            <h2 className="text-xl font-bold text-foreground">
              {user.firstName} {user.lastName}
            </h2>
            <p className="text-muted-foreground">{user.email}</p>

            <div className="mt-6 pt-6 border-t border-border space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">Member since</span>
                <span className="font-medium ml-auto">
                  {formatDate(user.memberSince)}
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Shield className="w-4 h-4 text-success" />
                <span className="text-muted-foreground">Account Status</span>
                <span className="font-medium text-success ml-auto">
                  Verified
                </span>
              </div>
            </div>
          </BankingCard>
        </div>

        {/* Profile Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <BankingCard variant="default" padding="md">
            <BankingCardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <User className="w-5 h-5 text-primary" />
                </div>
                <BankingCardTitle>Personal Information</BankingCardTitle>
              </div>
            </BankingCardHeader>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {isEditing ? (
                <>
                  <BankingInput
                    label="First Name"
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                  />
                  <BankingInput
                    label="Last Name"
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                  />
                </>
              ) : (
                <>
                  <div>
                    <p className="text-sm text-muted-foreground">First Name</p>
                    <p className="font-medium mt-1">{user.firstName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Last Name</p>
                    <p className="font-medium mt-1">{user.lastName}</p>
                  </div>
                </>
              )}

              <div>
                <p className="text-sm text-muted-foreground">Date of Birth</p>
                <p className="font-medium mt-1">
                  {formatDate(user.dateOfBirth)}
                </p>
              </div>
            </div>
          </BankingCard>

          {/* Contact Information */}
          <BankingCard variant="default" padding="md">
            <BankingCardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-accent" />
                </div>
                <BankingCardTitle>Contact Information</BankingCardTitle>
              </div>
            </BankingCardHeader>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {isEditing ? (
                <>
                  <BankingInput
                    label="Email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    icon={<Mail className="w-5 h-5" />}
                  />
                  <BankingInput
                    label="Phone"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    icon={<Phone className="w-5 h-5" />}
                  />
                </>
              ) : (
                <>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium mt-1">{user.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="font-medium mt-1">{user.phone}</p>
                  </div>
                </>
              )}
            </div>
          </BankingCard>

          {/* Address */}
          <BankingCard variant="default" padding="md">
            <BankingCardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-success" />
                </div>
                <BankingCardTitle>Address</BankingCardTitle>
              </div>
            </BankingCardHeader>

            {isEditing ? (
              <div className="space-y-4">
                <BankingInput
                  label="Street Address"
                  value={formData.street}
                  onChange={(e) =>
                    setFormData({ ...formData, street: e.target.value })
                  }
                />
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <BankingInput
                    label="City"
                    value={formData.city}
                    onChange={(e) =>
                      setFormData({ ...formData, city: e.target.value })
                    }
                  />
                  <BankingInput
                    label="State"
                    value={formData.state}
                    onChange={(e) =>
                      setFormData({ ...formData, state: e.target.value })
                    }
                  />
                  <BankingInput
                    label="ZIP Code"
                    value={formData.zipCode}
                    onChange={(e) =>
                      setFormData({ ...formData, zipCode: e.target.value })
                    }
                  />
                </div>
              </div>
            ) : (
              <div>
                <p className="text-sm text-muted-foreground">Full Address</p>
                <p className="font-medium mt-1">
                  {user.address.street}, {user.address.city},{" "}
                  {user.address.state} {user.address.zipCode}
                </p>
                <p className="text-muted-foreground">
                  {user.address.country}
                </p>
              </div>
            )}
          </BankingCard>
        </div>
      </div>
    </div>
  );
};

export default Profile;
