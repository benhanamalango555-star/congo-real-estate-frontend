import type { Listing, Payment } from "@shared/schema";

export async function createListing(formData: FormData) {
  const response = await fetch('/api/listings', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Erreur lors de la création de l\'annonce');
  }

  return response.json();
}

export async function getListings(): Promise<Listing[]> {
  const response = await fetch('/api/listings');
  
  if (!response.ok) {
    throw new Error('Erreur lors de la récupération des annonces');
  }

  return response.json();
}

export async function getListing(id: string): Promise<Listing> {
  const response = await fetch(`/api/listings/${id}`);
  
  if (!response.ok) {
    throw new Error('Erreur lors de la récupération de l\'annonce');
  }

  return response.json();
}

export async function createPhoneUnlock(listingId: string) {
  const response = await fetch('/api/phone-unlock', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ listingId }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Erreur lors du déblocage');
  }

  return response.json();
}

export async function confirmPayment(paymentId: string) {
  const response = await fetch(`/api/payments/${paymentId}/confirm`, {
    method: 'POST',
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Erreur lors de la confirmation');
  }

  return response.json();
}

export async function getPendingListings(): Promise<Listing[]> {
  const response = await fetch('/api/admin/listings/pending');
  
  if (!response.ok) {
    throw new Error('Erreur lors de la récupération des annonces en attente');
  }

  return response.json();
}

export async function getAllListingsAdmin(): Promise<Listing[]> {
  const response = await fetch('/api/admin/listings/all');
  
  if (!response.ok) {
    throw new Error('Erreur lors de la récupération des annonces');
  }

  return response.json();
}

export async function approveListing(id: string) {
  const response = await fetch(`/api/admin/listings/${id}/approve`, {
    method: 'POST',
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Erreur lors de l\'approbation');
  }

  return response.json();
}

export async function rejectListing(id: string) {
  const response = await fetch(`/api/admin/listings/${id}/reject`, {
    method: 'POST',
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Erreur lors du rejet');
  }

  return response.json();
}

export async function approveAllListings() {
  const response = await fetch('/api/admin/listings/approve-all', {
    method: 'POST',
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Erreur lors de l\'approbation');
  }

  return response.json();
}
