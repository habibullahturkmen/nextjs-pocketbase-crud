import PocketBase from "pocketbase";
import { backend } from "./constants";

const pb = new PocketBase(backend);

export default pb;
