import { AeonicusVendorData } from "./AeonicusVendorData";
import { AgosVendorData } from "./AgosVendorData";
import { ArturosVendorData } from "./ArturosVendorData";
import { DurusVendorData } from "./DurusVendorData";
import { FreddieVendorData } from "./FreddieVendorData";
import { HemetVendorData } from "./HemetVendorData";
import { HorosVendorData } from "./HorosVendorData";
import { JakkusVendorData } from "./JakkusVendorData";
import { LarahVendorData } from "./LarahVendorData";
import { PythagorusVendorData } from "./PythagorusVendorData";
import { SacerdormuVendorData } from "./SacerdormuVendorData";
import { UnicusVendorData } from "./UnicusVendorData";

export interface VendorConfig {
   name: string;
   category: string;
   data: any[];
}

export const vendors: VendorConfig[] = [
   {
      name: "Jakkus",
      category: "Felscorned Order Hall Mounts",
      data: JakkusVendorData,
   },
   {
      name: "Hemet Nesingwary XVII",
      category: "Remix Mounts",
      data: HemetVendorData,
   },
   {
      name: "Horos",
      category: "Rare Collections",
      data: HorosVendorData,
   },
   {
      name: "Unicus",
      category: "Exclusive Ensembles",
      data: UnicusVendorData,
   },
   {
      name: "Larah",
      category: "Open World & Questing Ensembles",
      data: LarahVendorData,
   },
   {
      name: "Arturos",
      category: "Dungeon Ensembles",
      data: ArturosVendorData,
   },
   {
      name: "Aeonicus",
      category: "Raid Finder Ensembles",
      data: AeonicusVendorData,
   },
   {
      name: "Durus",
      category: "Normal Raid Ensembles",
      data: DurusVendorData,
   },
   {
      name: "Sacerdormu",
      category: "Heroic Raid Ensembles",
      data: SacerdormuVendorData,
   },
   {
      name: "Pythagorus",
      category: "Mythic Raid Ensembles",
      data: PythagorusVendorData,
   },
   {
      name: "Agos the Silent",
      category: "Lost & Found Apparel",
      data: AgosVendorData,
   },
   {
      name: "Freddie Threads",
      category: "Discount Cloak Ensembles",
      data: FreddieVendorData,
   },
];
