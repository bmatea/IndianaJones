import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MockService } from '../services/mock.service';
import { Form, FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModemInfoModalComponent } from '../modem-info-modal/modem-info-modal.component';
import { isPrimitive } from 'util';

@Component({
  selector: 'app-simp.w-100',
  templateUrl: './simp.component.html',
  styleUrls: ['./simp.component.css']
})
export class SimpComponent implements OnInit, AfterViewInit {

  form: FormGroup;
  colors = {
    neRadi: 'url(#gradient_neRadi)',
    otežanoRadi: 'url(#gradient_otezanoRadi)',
    aktivno: 'url(#gradient_aktivno)',
    neaktivno: 'url(#gradient_neaktivno)',
    nijeMoguceUtvrditi: 'url(#gradient_nijeMoguceUtvrditi)',
    stroke: '#919191'
  };
  defaultFill = 'url(#gradient_nijeMoguceUtvrditi)';
  defaultStrokeStyle = 'none';
  strokeDasharray = '0.75733621, 0.37866811';
  btnFill = 'url(#gradient_btn)';

  internetFill = this.defaultFill;
  internetStrokeStyle = this.defaultStrokeStyle;
  iptvFill = this.defaultFill;
  iptvStrokeStyle = this.defaultStrokeStyle;
  voipFill = this.defaultFill;
  voipStrokeStyle = this.defaultStrokeStyle;
  acsFill = this.defaultFill;
  acsStrokeStyle = this.defaultStrokeStyle;
  potsFill = this.defaultFill;
  potsStrokeStyle = this.defaultStrokeStyle;
  msanFill = this.defaultFill;
  msanStrokeStyle = this.defaultStrokeStyle;
  telefonFill = this.defaultFill;
  telefonStrokeStyle = this.defaultStrokeStyle;
  modemFill = this.defaultFill;
  modemStrokeStyle = this.defaultStrokeStyle;
  internetAdslFill = this.defaultFill;
  internetAdslStrokeStyle = this.defaultStrokeStyle;
  ethFill = this.defaultFill;
  ethStrokeStyle = this.defaultStrokeStyle;
  atmFill = this.defaultFill;
  atmStrokeStyle = this.defaultStrokeStyle;
  stb1Fill = this.defaultFill;
  stb1StrokeStyle = this.defaultStrokeStyle;
  stb2Fill = this.defaultFill;
  stb2StrokeStyle = this.defaultStrokeStyle;
  stb3Fill = this.defaultFill;
  stb3StrokeStyle = this.defaultStrokeStyle;
  acs2Fill = this.defaultFill;
  acs2StrokeStyle = this.defaultStrokeStyle;

  m2mLineFill = this.defaultFill;
  m2mLineFillActive = '#C8FB3F';
  m2mLineStrokeStyle = this.defaultStrokeStyle;

  msan = '';
  slot = '';
  port = '';
  telefon = '';
  stb1Ip = '';
  stb2Ip = '';
  stb3Ip = '';
  losiSpojevi = '';
  resinkModema = '';
  gresakaNaLiniji = '';
  vdsl25 = '';
  vdsl50 = '';
  vdsl80 = '';
  udaljenost = '';
  propusnost = '';
  brzinaDefiniranaProfilom = '';
  disabled = true;
  modemInfoObj;

  prikljucak_id;
  adsl_username;
  iptv_username;

  isCollapsed = true;

  podaciValid = true;

  constructor(private service: MockService, private fb: FormBuilder, private modalService: NgbModal) {
    this.form = this.fb.group({
      tel: ['', []],
      adsl_username: ['', []],
      iptv_username: ['', []]
    });
   }

  ngOnInit() {

  }

  ngAfterViewInit() {

  }

  telefonReset() {

  }

  stbPing(stbNum, ip) {
    this.service.ping(ip).subscribe(res => (res['result'] === '0% packet loss' && res['poruka'] === 'OK') ? this['stb' + stbNum + 'Fill'] = this.colors.aktivno : this.colors.neRadi);
  }

  stbReboot() {

  }

  modemInfo() {
    if (!this.modemInfoObj)
    {
      return;
    }
    const modalRef = this.modalService.open(ModemInfoModalComponent);
    modalRef.componentInstance.modemInfo = this.modemInfoObj;
  }

  updateDiagram() {
    this.telefon = this.form.get('tel').value;
    this.adsl_username = this.form.get('adsl_username').value;
    this.prikljucak_id = this.form.get('iptv_username').value;

    //kako se provjerava da li su username i id vazeci??
    if (this.adsl_username !== '' || this.iptv_username !== '' || this.telefon !== '') {
      this.podaciValid = true;
      this.disabled = false;

      const type = this.form.get('tel').value !== '' ? 'tel' : (this.form.get('adsl_username').value !== '') ? 'adsl_username' : 'iptv_username';
      const data = (type === 'tel') ? this.form.get('tel').value : (type === 'adsl_username') ? this.form.get('adsl_username').value : this.form.get('iptv_username').value;
      this.service.getPrikId(type, data).subscribe(prik => {
        this.service.getData(prik['prikljucakId']).subscribe(data => {
          console.log(data[2]['oznaka']);
          this.telefon = data[0]['oznaka'];
          this.adsl_username = data[1]['oznaka'];
          this.iptv_username = data[2]['oznaka'];

          this.testTelService();
          this.testDslam('adsl_username', this.adsl_username);
          this.checkAcsAvailability(this.adsl_username, this.iptv_username);
          this.getAcsInfo(this.adsl_username, this.iptv_username);
          this.getDslamInfo(this.adsl_username, this.iptv_username);
          this.getProxyQuality();
          this.getLineLength(this.adsl_username, this.iptv_username);
        });
      });

    } else {
      this.podaciValid = false;
      return;
    }
  }

  checkUsernames(adsl_username, iptv_username) {

  }

  testTelService() {
    this.service.getMsanTelPort().subscribe(port => {
      this.service.checkTelephone(port).subscribe(res => {
        if (res['status'] === 'Normal') {
          this.telefonFill = this.colors.aktivno;
          this.telefonStrokeStyle = this.defaultStrokeStyle;
        } else {
          this.telefonStrokeStyle = this.strokeDasharray;
        }
      });
    });
  }

  testDslam(usernameType, username) {
    this.service.checkDslam(usernameType, username).subscribe(res => {
      if (res === 'NO') {
        this.msanFill = this.colors.neRadi;
      } else {
        this.msanFill = this.colors.aktivno;
      }
    });
  }

  checkAcsAvailability(adsl_username, iptv_username) {
    this.service.getAssetId(adsl_username, iptv_username).subscribe(id => {
      this.service.checkACS(adsl_username, iptv_username, id).subscribe(res => {
        if (res['errorcode'] === 0) {
          this.acs2Fill = this.colors.aktivno;
        } else {
          this.acs2Fill = this.colors.neRadi;
        }
      });
    });
  }

  getAcsInfo(adsl_username, iptv_username) {
    this.service.getAcsInfo(adsl_username, iptv_username).subscribe(info => {
      this.modemInfoObj = info[0];
      this.msan = info[0]['dslam_name'];
      this.port = info[0]['port'].toString();
      this.slot = info[0]['slot'].toString();
    });
  }

  getDslamInfo(adsl_username, iptv_username) {
    this.service.getTechnology().subscribe(tech => {
      this.service.getDslamInfo(adsl_username, iptv_username, tech).subscribe(info => {
        if (info['vdsl2PortInfo']['status'] === 'Active') {
          this.modemFill = this.msanFill = this.colors.aktivno;
        } else if (info['vdsl2PortInfo']['status'] === 'Activating') {
          this.modemFill = this.msanFill = this.colors.otežanoRadi;
        } else {
          this.modemFill = this.msanFill = this.colors.neRadi;
        }

        this.propusnost = info['vdsl2PortInfo']['attainableDown'] + '/' + info['vdsl2PortInfo']['attainableUp'] + ' kb/s';
        this.brzinaDefiniranaProfilom = info['vdsl2PortInfo']['lastDownStreamRate'] + '/' + info['vdsl2PortInfo']['lastUpStreamRate'] + ' kb/s';
        const serviceParentObject = info['vdsl2PortInfo']['services']['vdslServicePort'];
        const services = [];
        serviceParentObject.forEach(element => {
         services.push(element['type']);
        });
        if (services.includes('IPTV')) {
          this.iptvFill = this.colors.aktivno;
          const iptvObj = serviceParentObject.find(elem => elem['type'] === 'IPTV');
          const stbCount = iptvObj['stbCount'];
          let stbFills = [];
          let stbStrokes = [];
          let inactiveStbs = [];
          if (stbCount === 1) {
            stbFills.push('stb1Fill');
            stbStrokes.push('stb1StrokeStyle');
            inactiveStbs.push('stb2Fill', 'stb3Fill');
          } else if (stbCount === 2) {
            stbFills.push('stb1Fill', 'stb2Fill');
            stbStrokes.push('stb1StrokeStyle', 'stb2Fill');
            inactiveStbs.push('stb3Fill');
          } else if (stbCount === 3) {
            stbFills.push('stb1Fill', 'stb3Fill');
            stbStrokes.push('stb1StrokeStyle', 'stb2StrokeStyle', 'stb3StrokeStyle');
          }
          if (stbFills) {
            stbFills.forEach(elem => this[elem] = this.colors.nijeMoguceUtvrditi);
          }
          if (stbStrokes) {
            stbStrokes.forEach(elem => this[elem] = this.strokeDasharray);
          }
          if (inactiveStbs) {
            inactiveStbs.forEach(elem => this[elem] = this.colors.neaktivno);
          }
        } else {
          this.iptvFill = this.colors.neaktivno;
        }
        this.service.getIp(iptv_username).subscribe(data => this.stb1Ip = data['tempIpAdresa']);
        this.internetFill = services.includes('INTERNET') ? this.colors.aktivno : this.colors.neaktivno; //TODO pozvoi metodu i dohvati eth i atm status
        this.voipFill = services.includes('VOIP') ? this.colors.aktivno : this.colors.neaktivno;
        this.acsFill = services.includes('MANAGEMENT') ? this.colors.aktivno : this.colors.neaktivno;
        this.potsFill = services.includes('POTS') ? this.colors.aktivno : this.colors.neaktivno;
    });
  });
}
  getProxyQuality() {
    this.service.checkQuality().subscribe(res => {
      console.log(res['senv:Envelope']['senv:Body']['soap:check_qualityResponse']);
      const obj = res['senv:Envelope']['senv:Body']['soap:check_qualityResponse']['soap:check_qualityResult'];
      const atten = obj['soap:ATTEN'];
      const lol = obj['soap:LOL'];
      const crc = obj['soap:CRC'];
      const Vdsl_25 = obj['soap:Vdsl_25'];
      const Vdsl_50 = obj['soap:Vdsl_50'];
      const Vdsl_80 = obj['soap:Vdsl_80'];
      if (atten === 'YES' || lol === 'YES' || crc === 'YES') {
        this.m2mLineFill = this.colors.neRadi;
        this.m2mLineStrokeStyle = this.strokeDasharray;
      } else if (atten === 'MAYBE' || lol === 'MAYBE' || crc === 'MAYBE') {
        this.m2mLineFill = this.colors.otežanoRadi;
      } else {
        this.m2mLineFill = this.colors.aktivno;
      }
      if (lol === 'MAYBE' || lol === 'YES') {
        this.modemFill = this.colors.otežanoRadi;
      }
      this.losiSpojevi = atten;
      this.gresakaNaLiniji = crc;
      this.resinkModema = lol;
      this.vdsl25 = Vdsl_25;
      this.vdsl50 = Vdsl_50;
      this.vdsl80 = Vdsl_80;
    });
  }

  getLineLength(adsl_username, iptv_username) {
    this.service.getLineLength(adsl_username, iptv_username).subscribe(len => this.udaljenost = len);
  }


}
