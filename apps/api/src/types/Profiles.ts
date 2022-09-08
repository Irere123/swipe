import { Profile } from "passport-twitter";
import { Profile as FBProfile } from "passport-facebook";

export interface TwitterProfile extends Profile {}
export interface FacebookProfile extends FBProfile {}
