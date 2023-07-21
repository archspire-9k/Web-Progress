import { Engine, Scene } from "@babylonjs/core";

export default async function _goToCutscene(engine: Engine, scene: Scene) {

    return {
        engine: engine,
        scene: scene
    }

}