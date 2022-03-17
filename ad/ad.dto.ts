export interface CreateAdDto {
  message: string | null,
  color: string | null,
  background: string | null,
  style: string | null,
  baittext: string | null,
  trafficSent: string | null,
  SocialPageUrl: string | null,
  signupText: string | null,
  name: string | null,
  email: string | null,
  successMessage: string | null,
  autoResponder: string | null,
  type: string | null,
  fontSize: string | null
}

export interface PatchAdDto extends Partial<CreateAdDto> { }