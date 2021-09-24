import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TestService } from '../services/test.service';

@Component({
    templateUrl: './add-test.component.html',
    styleUrls: ['./add-test.component.css']
})

export class AddTestComponent implements OnInit
{
    testForm: FormGroup;
    title: string = "Create";
    id: number;
    errorMessage: any;

    constructor(private _fb: FormBuilder, private _avRoute: ActivatedRoute, private _testService: TestService, private _router: Router)
    {
        if( this._avRoute.snapshot.params["id"] )
        {
            this.id = this._avRoute.snapshot.params["id"];
        }

        this.testForm = this._fb.group({
            id: 0,
            name: ['', [Validators.required]],
            location: ['', [Validators.required]]
        })
    }

    ngOnInit()
    {
        if( this.id > 0 )
        {
            this.title = "Update";
            this._testService.getTestById(this.id).subscribe(resp => this.testForm.setValue(resp), error => this.errorMessage = error);
        }
    }

    addTest()
    {
        if( !this.testForm.valid )
        {
            return;
        }

        if( this.title == "Create" )
        {
            this._testService.addTest(this.testForm.value)
            .subscribe((data) =>
            {
                this._router.navigate(['/get-test']);
            }, error => this.errorMessage = error)
        }
        else if( this.title == "Update" )
        {
            this._testService.updateTest(this.testForm.value)
            .subscribe((data) =>
            {
                this._router.navigate(['/get-test']);
            }, error => this.errorMessage = error)
        }
    }

    cancel()
    {
        this._router.navigate(['/get-test']);
    }

    get name()
    {
        return this.testForm.get('name');
    }

    get location()
    {
        return this.testForm.get('location');
    }
}
