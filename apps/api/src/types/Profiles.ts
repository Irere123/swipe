import { Profile } from "passport-twitter";
import { Profile as UFP } from "passport-facebook";

export interface TWProfile extends Profile {}
export interface FBProfile extends UFP {}
