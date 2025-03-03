import { app } from "@/app";
import request from "supertest";
import { prisma } from "@/database/prisma";

describe("SessionController",
    () => {
        let user_id: string;

        afterAll(async () => {
            await prisma.user.delete({where: {id: user_id}});
        })

        it("should authenticate a and get access token", async () => {
            const userResponse = await request(app).post("/user").send({
                name: "Auth test user",
                email: "auth_test_user@example.com",
                password: "1234567"
            })

            const sessionResponse = await request(app).post("/session").send({
                email: "auth_test_user@example.com",
                password: "1234567"
            })

            user_id = userResponse.body.id;
            expect(sessionResponse.status).toBe(200)
            expect(sessionResponse.body.token).toEqual(expect.any(String))
        })
    }
)