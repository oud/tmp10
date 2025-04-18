import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { IAdresse } from 'app/entities/adresse/adresse.model';
import { AdresseService } from 'app/entities/adresse/service/adresse.service';
import { IEmail } from 'app/entities/email/email.model';
import { EmailService } from 'app/entities/email/service/email.service';
import { ITelephone } from 'app/entities/telephone/telephone.model';
import { TelephoneService } from 'app/entities/telephone/service/telephone.service';
import { IDemandeXRM } from 'app/entities/demande-xrm/demande-xrm.model';
import { DemandeXRMService } from 'app/entities/demande-xrm/service/demande-xrm.service';
import { IPmEtablissement } from '../pm-etablissement.model';
import { PmEtablissementService } from '../service/pm-etablissement.service';
import { PmEtablissementFormService } from './pm-etablissement-form.service';

import { PmEtablissementUpdateComponent } from './pm-etablissement-update.component';

describe('PmEtablissement Management Update Component', () => {
  let comp: PmEtablissementUpdateComponent;
  let fixture: ComponentFixture<PmEtablissementUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let pmEtablissementFormService: PmEtablissementFormService;
  let pmEtablissementService: PmEtablissementService;
  let adresseService: AdresseService;
  let emailService: EmailService;
  let telephoneService: TelephoneService;
  let demandeXRMService: DemandeXRMService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PmEtablissementUpdateComponent],
      providers: [
        provideHttpClient(),
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(PmEtablissementUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(PmEtablissementUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    pmEtablissementFormService = TestBed.inject(PmEtablissementFormService);
    pmEtablissementService = TestBed.inject(PmEtablissementService);
    adresseService = TestBed.inject(AdresseService);
    emailService = TestBed.inject(EmailService);
    telephoneService = TestBed.inject(TelephoneService);
    demandeXRMService = TestBed.inject(DemandeXRMService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('should call adresse query and add missing value', () => {
      const pmEtablissement: IPmEtablissement = { id: 14323 };
      const adresse: IAdresse = { id: 31795 };
      pmEtablissement.adresse = adresse;

      const adresseCollection: IAdresse[] = [{ id: 31795 }];
      jest.spyOn(adresseService, 'query').mockReturnValue(of(new HttpResponse({ body: adresseCollection })));
      const expectedCollection: IAdresse[] = [adresse, ...adresseCollection];
      jest.spyOn(adresseService, 'addAdresseToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ pmEtablissement });
      comp.ngOnInit();

      expect(adresseService.query).toHaveBeenCalled();
      expect(adresseService.addAdresseToCollectionIfMissing).toHaveBeenCalledWith(adresseCollection, adresse);
      expect(comp.adressesCollection).toEqual(expectedCollection);
    });

    it('should call email query and add missing value', () => {
      const pmEtablissement: IPmEtablissement = { id: 14323 };
      const email: IEmail = { id: 20273 };
      pmEtablissement.email = email;

      const emailCollection: IEmail[] = [{ id: 20273 }];
      jest.spyOn(emailService, 'query').mockReturnValue(of(new HttpResponse({ body: emailCollection })));
      const expectedCollection: IEmail[] = [email, ...emailCollection];
      jest.spyOn(emailService, 'addEmailToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ pmEtablissement });
      comp.ngOnInit();

      expect(emailService.query).toHaveBeenCalled();
      expect(emailService.addEmailToCollectionIfMissing).toHaveBeenCalledWith(emailCollection, email);
      expect(comp.emailsCollection).toEqual(expectedCollection);
    });

    it('should call telephone query and add missing value', () => {
      const pmEtablissement: IPmEtablissement = { id: 14323 };
      const telephone: ITelephone = { id: 29884 };
      pmEtablissement.telephone = telephone;

      const telephoneCollection: ITelephone[] = [{ id: 29884 }];
      jest.spyOn(telephoneService, 'query').mockReturnValue(of(new HttpResponse({ body: telephoneCollection })));
      const expectedCollection: ITelephone[] = [telephone, ...telephoneCollection];
      jest.spyOn(telephoneService, 'addTelephoneToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ pmEtablissement });
      comp.ngOnInit();

      expect(telephoneService.query).toHaveBeenCalled();
      expect(telephoneService.addTelephoneToCollectionIfMissing).toHaveBeenCalledWith(telephoneCollection, telephone);
      expect(comp.telephonesCollection).toEqual(expectedCollection);
    });

    it('should call DemandeXRM query and add missing value', () => {
      const pmEtablissement: IPmEtablissement = { id: 14323 };
      const demandeXRM: IDemandeXRM = { id: 16042 };
      pmEtablissement.demandeXRM = demandeXRM;

      const demandeXRMCollection: IDemandeXRM[] = [{ id: 16042 }];
      jest.spyOn(demandeXRMService, 'query').mockReturnValue(of(new HttpResponse({ body: demandeXRMCollection })));
      const additionalDemandeXRMS = [demandeXRM];
      const expectedCollection: IDemandeXRM[] = [...additionalDemandeXRMS, ...demandeXRMCollection];
      jest.spyOn(demandeXRMService, 'addDemandeXRMToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ pmEtablissement });
      comp.ngOnInit();

      expect(demandeXRMService.query).toHaveBeenCalled();
      expect(demandeXRMService.addDemandeXRMToCollectionIfMissing).toHaveBeenCalledWith(
        demandeXRMCollection,
        ...additionalDemandeXRMS.map(expect.objectContaining),
      );
      expect(comp.demandeXRMSSharedCollection).toEqual(expectedCollection);
    });

    it('should update editForm', () => {
      const pmEtablissement: IPmEtablissement = { id: 14323 };
      const adresse: IAdresse = { id: 31795 };
      pmEtablissement.adresse = adresse;
      const email: IEmail = { id: 20273 };
      pmEtablissement.email = email;
      const telephone: ITelephone = { id: 29884 };
      pmEtablissement.telephone = telephone;
      const demandeXRM: IDemandeXRM = { id: 16042 };
      pmEtablissement.demandeXRM = demandeXRM;

      activatedRoute.data = of({ pmEtablissement });
      comp.ngOnInit();

      expect(comp.adressesCollection).toContainEqual(adresse);
      expect(comp.emailsCollection).toContainEqual(email);
      expect(comp.telephonesCollection).toContainEqual(telephone);
      expect(comp.demandeXRMSSharedCollection).toContainEqual(demandeXRM);
      expect(comp.pmEtablissement).toEqual(pmEtablissement);
    });
  });

  describe('save', () => {
    it('should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPmEtablissement>>();
      const pmEtablissement = { id: 16761 };
      jest.spyOn(pmEtablissementFormService, 'getPmEtablissement').mockReturnValue(pmEtablissement);
      jest.spyOn(pmEtablissementService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ pmEtablissement });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: pmEtablissement }));
      saveSubject.complete();

      // THEN
      expect(pmEtablissementFormService.getPmEtablissement).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(pmEtablissementService.update).toHaveBeenCalledWith(expect.objectContaining(pmEtablissement));
      expect(comp.isSaving).toEqual(false);
    });

    it('should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPmEtablissement>>();
      const pmEtablissement = { id: 16761 };
      jest.spyOn(pmEtablissementFormService, 'getPmEtablissement').mockReturnValue({ id: null });
      jest.spyOn(pmEtablissementService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ pmEtablissement: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: pmEtablissement }));
      saveSubject.complete();

      // THEN
      expect(pmEtablissementFormService.getPmEtablissement).toHaveBeenCalled();
      expect(pmEtablissementService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPmEtablissement>>();
      const pmEtablissement = { id: 16761 };
      jest.spyOn(pmEtablissementService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ pmEtablissement });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(pmEtablissementService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareAdresse', () => {
      it('should forward to adresseService', () => {
        const entity = { id: 31795 };
        const entity2 = { id: 16957 };
        jest.spyOn(adresseService, 'compareAdresse');
        comp.compareAdresse(entity, entity2);
        expect(adresseService.compareAdresse).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareEmail', () => {
      it('should forward to emailService', () => {
        const entity = { id: 20273 };
        const entity2 = { id: 30632 };
        jest.spyOn(emailService, 'compareEmail');
        comp.compareEmail(entity, entity2);
        expect(emailService.compareEmail).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareTelephone', () => {
      it('should forward to telephoneService', () => {
        const entity = { id: 29884 };
        const entity2 = { id: 17258 };
        jest.spyOn(telephoneService, 'compareTelephone');
        comp.compareTelephone(entity, entity2);
        expect(telephoneService.compareTelephone).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareDemandeXRM', () => {
      it('should forward to demandeXRMService', () => {
        const entity = { id: 16042 };
        const entity2 = { id: 11627 };
        jest.spyOn(demandeXRMService, 'compareDemandeXRM');
        comp.compareDemandeXRM(entity, entity2);
        expect(demandeXRMService.compareDemandeXRM).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
