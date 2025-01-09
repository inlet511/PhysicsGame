import { PhysicsSystem, Node, Vec3, PhysicsSystem2D, RigidBody2D, ERigidBody2DType, Vec2 } from "cc";

export class PhysicsUtil {
    static enablePhysicsSystem(){
        PhysicsSystem2D.instance.enable = true;
    }

    static disablePhysicsSystem(){
        PhysicsSystem2D.instance.enable = false;
    }

    static setRigidBodyStatic(node:Node)
    {
        const rigidBody = node.getComponent(RigidBody2D)!;

        rigidBody.type = ERigidBody2DType.Static;      
    }

    static setRigidBodyDynamic(node:Node)
    {
        const rigidBody = node.getComponent(RigidBody2D)!;
        rigidBody.type = ERigidBody2DType.Dynamic;  
    }

    static setRigidBodyV(node:Node, v: Vec2)
    {
        const rigidBody = node.getComponent(RigidBody2D)!;
        rigidBody.linearVelocity = v;      
    }

}


