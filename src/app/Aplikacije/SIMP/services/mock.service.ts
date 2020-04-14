import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { NgxSoapService, Client, ISoapMethodResponse } from 'ngx-soap';
import { NgxXml2jsonService } from 'ngx-xml2json';

@Injectable({
  providedIn: 'root'
})
export class MockService {

  client: Client;

  constructor(private http: HttpClient, private soapService: NgxSoapService, private xml2Json: NgxXml2jsonService) { }

  checkPots() {

  }

  getMsanTelPort() {
    //koji parametri se salju za dobit port?
    return of(46);
  }

  checkTelephone(port): Observable<object> {
    //zovi servis i proslijedi mu port
    const obj = {
      status: "Normal",
      phoneNumber: "37823412231",
      customerName: "name"
    };
    return of(obj);
  }

  checkDslam(username_type, username) {
    //return this.http.get('http://10.16.22.50:8080/DefinicijaProcesa/DslamIspadiByAdslUsername?' + username_type + '=' + username);
    return of("DA");
  }

  getAssetId(adsl_username, iptv_username) {
    //this.http.get('http://10.16.22.50:8080/DefinicijaProcesa/dDohvatiAssetIdDohvatiAssetId?vAdslUserName=' + adsl_username + '&iptv_username=' + iptv_username);
    return of('assetId');
  }

  checkACS(adsl_username, iptv_username, assetId) {
    const body = `
    <senv:Envelope xmlns:senv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:soap="http://schemas.xmlsoap.org/wsdl/soap/">
    <senv:Body>
       <urn:tr069checkdeviceavailabilitydata>
       <osssystemid>k44rWW11</osssystemid>
       <assetid>` + assetId + `</assetid>
       </urn:tr069checkavailabilitydata>
      </senv:Body>
    </senv:Envelope>`;
    // this.http.get('http://10.101.1.82/AcsProvisioningService', body).subscribe(res => {
    //   const xml = new DOMParser().parseFromString(res.toString(), 'text/xml');
    //   const jsonres = this.xml2Json.xmlToJson(xml);
    // });
    return of({errorcode: 0}); // 200 ili 202 su nedostupni

  }

  getAcsInfo(adsl_username, iptv_username) {
    //this.http.get('http://10.16.22.50:8080/DefinicijaProcesa/GetAcsInfoByUserName?vAdslUserName=' + adsl_username + '&iptv_username=' + iptv_username);
    return of([
      {
         "asset_id":"351563",
         "service_id":2,
         "service":"ADSL internet + IPTV",
         "bridgemode":"NE",
         "pppoe_username":"dcava4mo",
         "wifi_enabled":"DA",
         "customer_name":"Ćavar Dragan",
         "activated":"DA",
         "activated_device_guid":906446,
         "activated_device_sn":"S182E05001153",
         "activated_device_class":"VMG1312-B10D",
         "fxso__sip_uri":null,
         "fxso__sip_username":null,
         "fxso_sipserver_address":null,
         "fxs1_sip_uri":null,
         "fxs1_sip_username":null,
         "fxs1_sipserver_address":null,
         "dhcp_black_listed":0,
         "uredjaj_f_s_port":"MA5600T_CentarII-2/0/1/14",
         "dslam_name":"MA5600T_CentarII-2",
         "slot":1,
         "port":14
      }
   ]);

  }

  getTechnology() {
    return of('BAKAR');
  }

  getDslamInfo(adsl_username, iptv_username, technology) {
    //kako poslati body???
    //this.http.get('http://10.16.22.50:8080/DefinicijaProcesa/GetDslamInfoByUserName?vAdslUserName=' + adsl_username + '&iptv_username=' + iptv_username);
    return of({
      "vdsl2PortInfo":{
         "attainableDown":"30307",
         "lastUpTime":"2020-03-22 00:02:22",
         "attainableUp":"3330",
         "services":{
            "vdslServicePort":[
               {
                  "userVlanId":2016,
                  "tx":"acs",
                  "stbCount":0,
                  "type":"MANAGEMENT",
                  "vlanId":3517,
                  "rx":"acs",
                  "vpi":0,
                  "vci":0
               },
               {
                  "userVlanId":2015,
                  "tx":"internet",
                  "stbCount":0,
                  "type":"INTERNET",
                  "vlanId":154,
                  "rx":"internet",
                  "vpi":0,
                  "vci":0
               },

            ]
         },
         "_alias":"Cavar_Dragan_(Franjo)-036327747",
         "lastDownStreamRate":"26597",
         "lastDownTime":"2020-03-21 23:58:43",
         "lastUpStreamRate":"2128",
         "lineProfile":"30/2_IPTV-2HD",
         "status":"Activating",
         "type":null
      },
      "detdslaminfoporuka":null
   });
  }

  getParamsForWsdl(adsl_username, iptv_username) {
    //this.http.get('http://10.16.22.50:8080/DefinicijaProcesa/ParametersForWsdl?vAdslUserName=' + adsl_username + '&iptv_username=' + iptv_username);
    return `{
      "uredjaj":"MA5600T_CentarII-2",
      "frame":0,
      "slot":"1",
      "port":14,
      "proizvodjac":"HUAWEI",
      "vsdl":1
    }`;
  }

  checkQuality() {
    const body = `<senv:Envelope xmlns:senv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:soap="http://schemas.xmlsoap.org/wsdl/soap/">
    <senv:Body>
       <urn:check_quality>
       <osssystemid>k44rWW11</osssystemid>
       </urn:check_quality>
      </senv:Body>
    </senv:Envelope>`; // kako se zovu parametri u soap metodi????
    //this.http.get('http://172.26.1.34:8000/?wsdl'); // kako poslati body???
    const res = `<senv:Envelope xmlns:senv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:soap="http://schemas.xmlsoap.org/wsdl/soap/">
    <senv:Body>
       <soap:check_qualityResponse>
          <soap:check_qualityResult>
             <soap:ATTEN>MAYBE</soap:ATTEN>
             <soap:LOL>YES</soap:LOL>
             <soap:CRC>NO</soap:CRC>
             <soap:Vdsl_25>YES</soap:Vdsl_25>
             <soap:Vdsl_80>NO</soap:Vdsl_80>
             <soap:Vdsl_50>MAYBE</soap:Vdsl_50>
          </soap:check_qualityResult>
       </soap:check_qualityResponse>
      </senv:Body>
    </senv:Envelope>`;
    return of(this.xml2Json.xmlToJson(new DOMParser().parseFromString(res, 'text/xml')));
  }

  getLineLength(adsl_username, iptv_username) {
    // return this.http.get('http://10.16.22.50:8080/DefinicijaProcesa/getLineLength?vAdslUserName=' + adsl_username + '&iptv_username=' + iptv_username);
    return of('1354');
  }

  ping(ip) {
    //kako napravit api za dohvat adresa???? odakle mi parametri, url i sl???
    //return this.http.get('http://10.16.22.50:8080/DefinicijaProcesa/PingByIPadr?ip_adresa=' + ip);
    return of({
      "result":"0% packet loss",
      "poruka":"OK"
    });
  }

  radiusInfo(adsl_username) {
    //kako pozvati proceduru????
  }
}
