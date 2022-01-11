import { Injectable } from '@nestjs/common';
import { createClient } from '@astrajs/collections';
import { ConfigService } from '@nestjs/config';
const bcrypt = require('bcryptjs');

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}
  private async getClient(){
    return createClient({
      astraDatabaseId: this.configService.get('ASTRA_DB_ID'),
      astraDatabaseRegion: this.configService.get('ASTRA_DB_REGION'),
      applicationToken: this.configService.get('ASTRA_DB_APPLICATION_TOKEN'),
    });
  }
  async getMembers() {
    const client = await this.getClient();
    const collection = client.namespace('mydb').collection('members');
    return collection.find({})
  }

  async postMembers(member:any) {
    const client = await this.getClient();
    const collection = client.namespace('mydb').collection('members');
    const result = await collection.create({      
      firstName : member.firstName,
      lastName : member.lastName,
      email : member.email,
      password : bcrypt.hashSync(member.password,8),
      phone : member.phone,
      address : member.address,
      city : member.city,
      category: member.radios,
    });
    return{
      id : result.documentId,
      ...member
    }
  }
}
