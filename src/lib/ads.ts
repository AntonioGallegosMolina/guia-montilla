import adsData from "../../data/ads.json";
import { ADS, type AdPlacement } from "../data/site";

export type LocalAd = {
  id: string;
  placement: AdPlacement | string;
  active: boolean;
  title: string;
  subtitle?: string;
  href: string;
  image?: string;
  sponsorLabel?: string;
};

export function getLocalAd(placement: AdPlacement): LocalAd | null {
  if (!ADS.enabled) return null;
  const match = (adsData as LocalAd[]).find(
    (ad) => ad.active && ad.placement === placement
  );
  return match ?? null;
}

export function getAdSenseSlot(placement: AdPlacement): string {
  return ADS.slots[placement] ?? "";
}

export function shouldRenderAdSlot(placement: AdPlacement): boolean {
  if (!ADS.enabled) return false;
  return Boolean(getLocalAd(placement) || getAdSenseSlot(placement));
}
