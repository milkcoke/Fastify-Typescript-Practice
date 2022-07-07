import grpc from 'grpc';
import {loadSync} from "@grpc/proto-loader";
import path from "path";

const PROTO_PATH = path.join(__dirname, '..', 'proto/employee.proto');

// Load package definition.
const packageDefinition = loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});

// get the proto_buffer definition.
const employee_proto = grpc.loadPackageDefinition(packageDefinition).employee;

// procedure call
// create a client stub for running procedure function on gRPC server.
const gGRPCClient = new employee_proto.Employee('localhost:4500', grpc.credentials.createInsecure());

gGRPCClient.getInformation({id: 1}, (err, response)=>{
    console.log('Employee information id 1', response.message);
});






