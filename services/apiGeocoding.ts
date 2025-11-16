export type PositionType = {
  latitude: number;
  longitude: number;
};

export type AddressResponse = {
  locality: string | null;
  city: string | null;
  postcode: string | null;
  countryName: string | null;
  // feel free to add extra fields if needed
};

export async function getAddress({
  latitude,
  longitude,
}: PositionType): Promise<AddressResponse> {
  const res = await fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}`
  );

  if (!res.ok) throw new Error("Failed getting address");

  const data = await res.json();

  return data;
}
